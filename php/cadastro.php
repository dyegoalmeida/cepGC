<?php

  include_once("database.php");

  $postdata = file_get_contents("php://input");

  if(isset($postdata) && !empty($postdata))
  {

    $request = json_decode($postdata);

    $cep = trim($request->cep);
    $city = mysqli_real_escape_string($mysqli, trim($request->city));
    $user = mysqli_real_escape_string($mysqli, $request->user);

    $sql = "INSERT INTO cep(cep,city) VALUES ('$cep','$city','$user')";

    if ($mysqli->query($sql) === TRUE)
    {

      $authdata = [
        'cep' => $cep,
        'city' => $city,
        'id' => mysqli_insert_id($mysqli)
      ];

      echo json_encode($authdata);

    }

  }
