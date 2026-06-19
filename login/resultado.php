<?php
$nome = $_POST['nome'];
$idade = $_POST['idade'];
$email = $_POST['email'];
$senha = $_POST['senha'];
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Resultado do Cadastro</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Candara', sans-serif;
        }

        body {
            background-image: url('../imagens/Futebol-da-Formacao-a-Competicao.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container-resultado {
            background: #006400;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 0 15px #1826437a;
            width: 400px;
            text-align: center;
            color: white;
        }

        h1 {
            font-family: 'one piece';
            font-size: 45px;
            margin-bottom: 20px;
        }

        p {
            font-size: 20px;
            margin-bottom: 15px;
        }

        strong {
            color: rgb(181, 181, 181);
        }

        a {
            display: inline-block;
            margin-top: 20px;
            color: rgb(181, 181, 181);
            text-decoration: none;
            font-weight: bold;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container-resultado">
        <h1>Cadastro Concluído!</h1>
        <p><strong>Nome:</strong> <?php echo htmlspecialchars($nome); ?></p>
        <p><strong>Idade:</strong> <?php echo htmlspecialchars($idade); ?></p>
        <p><strong>Email:</strong> <?php echo htmlspecialchars($email); ?></p>
        <p><strong>Senha:</strong> <?php echo htmlspecialchars($senha); ?></p>
        <p>Obrigado por se cadastrar!</p>
        <a href="login.html" target="_blank">← Voltar ao Login</a>
    </div>
</body>
</html>
