<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$operationData = array();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    ob_start();
    $Sign_A = array('*', '+');
    $Data_A = array(
        'N1' => rand(0, 10),
        'N2' => rand(0, 10),
        'Sign' => $Sign_A[rand(0, 1)],
    );
    ob_get_clean();
    $operationData = $Data_A;
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($operationData);
} 
else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $postData = json_decode(file_get_contents("php://input"), true);

    // Calcul de la réponse correcte
    $correctAnswer = calculateAnswer($postData['N1'], $postData['N2'], $postData['Sign']);

    // Vérification de la validité de la réponse
    $isCorrect = ($postData['UserAnswer'] == $correctAnswer) ? true : false;

    // Envoi de la réponse à Angular
    $response = array('isCorrect' => $isCorrect, 'correctAnswer' => $correctAnswer);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response);
}

function calculateAnswer($num1, $num2, $sign)
{
    switch ($sign) {
        case '*':
            return $num1 * $num2;
            break;
        case '+':
            return $num1 + $num2;
            break;
        default:
            return "Opération impossible";
    }
}
?>
