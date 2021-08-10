<?php

include_once("database.php");

$postdata = file_get_contents("php://input");

function validateCep($cep)
{

  $arrayKeys = [];
  $arrayNum = [];
  $sub = 0;

  $cepStr = (string) $cep;

  $array = str_split($cepStr);

  foreach ($array as $value) {

    $regex = "/" . $value . "/";

    //Filtra o número repetido criando um novo array
    $arrayResult = preg_grep($regex, $array);

    //Retorna o array das posições do array $arrayResult
    $arrayKeys = array_keys($arrayResult);

    $lengthArray = count($arrayKeys);

    $sub = 0;

    for ($id = ($lengthArray - 1); $id >= 0; $id--) {

      $sub = $arrayKeys[$id] - $sub;
    }

    if (abs($sub) == 2) {
      //Procura no array se o valor existe e retorna o índice
      if (in_array($value, $arrayNum) == false) {
        //Add o valor após o último no array
        array_push($arrayNum, $value);
      }
    }
  }

  return $arrayNum;
}

if (isset($postdata) && !empty($postdata)) {

  $request = json_decode($postdata);

  $arrayValidate = validateCep($request->cep);

  $msgNum = implode(",", $arrayValidate);

  if ($msgNum != "") {

    $validateCEP = [
      'msg' => 'Atenção! Números: ' . $msgNum . ' contém dígito(s) repetitivo(s), digite um CEP válido!'
    ];

    echo json_encode($validateCEP);

  } else {

    $cep = trim($request->cep);
    $city = mysqli_real_escape_string($mysqli, trim($request->city));

    $sql = "INSERT INTO cep(cep,city) VALUES ('$cep','$city')";

    if ($mysqli->query($sql) === TRUE) {

      $authdata = [
        'cep' => $cep,
        'city' => $city,
        'id' => mysqli_insert_id($mysqli),
        'msg' => 'CEP cadastrado com sucesso!'
      ];

      echo json_encode($authdata);
    }

  }
}
