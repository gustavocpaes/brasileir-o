//cadastro
document.getElementById('formulario-registro')?.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const senha = document.getElementById('nova-senha').value;

    if (senha.length < 6) {
        alert("A senha deve conter pelo menos 6 caracteres.");
        return;
    }

    alert("Conta criada com sucesso!");
});


//login
document.getElementById('formulario-login')?.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const senha = document.getElementById('senha').value;

    if (senha.length < 6) {
        alert("Senha muito curta! ❌");
        return;
    }

    alert("Login aprovado! ✔");

    setTimeout(() => {
        window.location.href = '../principal/index.html';
    }, 800);
});
