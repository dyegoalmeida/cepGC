<?php

include_once("database.php");

$postdata = file_get_contents("php://input");

function validateCep($cep)
{

  $arrayKeys = [];
  $arrayNum = [];

  $cepStr = (string) $cep;

  $array = str_split($cepStr);

  foreach ($array as $value) {

    $regex = "/" . $value . "/";

    //Filtra o número repetido criando um novo array
    $arrayResult = preg_grep($regex, $array);

    if (count($arrayResult) > 1){
      //Retorna um array com as posições do array $arrayResult como conteúdo
      $arrayKeys = array_keys($arrayResult);

      $lengthArray = count($arrayKeys);

      $sub = 0;

      for ($id = ($lengthArray - 1); $id >= 0; $id--) {

        if ($id != 0){

          $sub = $arrayKeys[$id] - $arrayKeys[$lengthArray - 2];

          if ($sub == 2){
            array_push($arrayNum, $value);
            break;
          }

        }

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
      'msg' => 'Atenção! Os seguintes número(s) são dígito(s) repetitivo(s) alternado em par: ' . $msgNum
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
