<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Formulário de Cadastro</title>
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

        .container-cadastro {
            background: #006400;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 0 15px #1826437a;
            width: 400px;
            text-align: center;
        }

        h1 {
            color: white;
            margin-bottom: 20px;
            font-family: 'one piece';
            font-size: 45px;
        }

        label {
            color: white;
            display: block;
            text-align: left;
            margin-bottom: 5px;
            font-size: 1rem;
        }

        input[type="text"],
        input[type="number"],
        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 12px;
            margin-bottom: 15px;
            border-radius: 5px;
            border: 2px solid white;
            background-color: rgb(181, 181, 181);
            color: black;
            font-size: 1rem;
        }

        input[type="submit"] {
            width: 100%;
            padding: 12px;
            background-color: white;
            color: black;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            font-family: 'one piece';
            font-size: 24px;
        }

        input[type="submit"]:hover {
            background-color: rgb(181, 181, 181);
            color: black;
        }

    </style>
</head>
<body>
    <div class="container-cadastro">
        <h1>Cadastro</h1>
        <form action="resultado.php" method="POST">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required>

            <label for="idade">Idade:</label>
            <input type="number" id="idade" name="idade" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="senha">Senha:</label>
            <input type="password" id="senha" name="senha" required>

            <input type="submit" value="Enviar">
        </form>
    </div>
</body>
</html>
