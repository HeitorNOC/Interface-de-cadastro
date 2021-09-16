var dados = []

function ApagaRegistro(id) {

    let _confirm = confirm("Tem certeza que quer excluir este usuário?")

    if (_confirm) {
        for (let i = 0; i < dados.length; i++) // laço for para percorrer a lista e em seguida um if para determinar qual o elemento escolhido
            if (dados[i].Id == id) {
                dados.splice(i, 1)
            }
    }

    Populatabela()
}

function EditaRegistro(id) {
    $("#modalRegistro").modal("show")

    dados.forEach(function(item) {
        if (item.Id == id) {
            $("#hdId").val(item.Id)
            $("#txtNome").val(item.Nome)
            $("#txtSobrenome").val(item.Sobrenome)
            $("#txtNascimento").val(item.Nascimento.substr(6, 4) + "-" + item.Nascimento.substr(3,  2) + "-" + item.Nascimento.substr(0, 2))
            $("#txtInstagram").val(item.Instagram)
        }
    })
}

function Populatabela() {
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#tblDados tbody").html("")

        dados.forEach(function (item) {
            $("#tblDados tbody").append(`<tr>
            <td>${item.Id}</td>
            <td>${item.Nome}</td>
            <td>${item.Sobrenome}</td>
            <td>${item.Nascimento}</td>
            <td>${item.Instagram}</td>
            <td><button type="button" class="btn btn-secondary" onclick="javascript:EditaRegistro(${item.Id});"><i class="fa fa-edit" /></button></td>
            <td><button type="button" class="btn btn-primary" onclick="javascript:ApagaRegistro(${item.Id});"><i class="fa fa-trash" /></button></td>
            </tr>`)
        })
    }
}

$(function () {
    // Executa ao carregar a tela
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados) {
        Populatabela()
    }

    $("#btnSalvar").on("click", function () {

        let _id = $("#hdId").val()
        let Nome = $("#txtNome").val()
        let Sobrenome = $("#txtSobrenome").val()
        let Nascimento = new Date($("#txtNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
        let Instagram = $("#txtInstagram").val()

        
        if (!_id || _id  == "0") {
            let registro = {}
            registro.Nome = Nome
            registro.Sobrenome = Sobrenome
            registro.Nascimento = Nascimento
            registro.Instagram = Instagram

            registro.Id = dados.length + 1
            dados.push(registro)
        }
        else {
            dados.forEach(function(item) {
                if (item.Id == _id) {
                    item.Nome = Nome
                    item.Sobrenome = Sobrenome
                    item.Nascimento = Nascimento
                    item.Instagram = Instagram
                }
            })
        }

        alert("Registro salvo com sucesso!")
        $("#modalRegistro").modal("hide")

        // Limpando os campos da modal
        $("#hdId").val("0")
        $("#txtNome").val("")
        $("#txtSobrenome").val("")
        $("#txtNascimento").val("")
        $("#txtInstagram").val("")


        Populatabela()
    })
})