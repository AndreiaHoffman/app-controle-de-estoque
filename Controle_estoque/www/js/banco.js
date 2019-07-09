// banco
var db = window.openDatabase("Database", "1.0", "cadastro", 2000000);
db.transaction(createDB, errorDB, sucessDB);
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db.transaction(createDB, errorDB, sucessDB);
}

function errorDB(err) {
    alert("Erro: " + err);
}

function sucessDB() { }

//criação de tabela
function createDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS cadastro (id INTEGER PRIMARY KEY, nome VARCHAR(50), descricao VARCHAR(50), quantidade NUM(3), preco NUM(6))');
}

//mensagem de cadastro efetuado com sucesso
function openToastTop() {
    openToast({
      message: 'Cadastro feito com sucesso!',
      class: 'full text-big text-strong black-opacity-70 text-white',
      position: 'top'
    })
  }

// comando de inserir dados no banco
function cadastro_insert() {
    var nome = $("#nome_produto").val();

    if(nome == "" || nome.trim().length < 0){
        alert("O nome do produto é obrigatório!");
    }else{
        db.transaction(cadastro_insert_db, errorDB, sucessDB);
        openToastTop();
    }
}

function cadastro_insert_db(tx) {

    var nome = $("#nome_produto").val();
    var descricao = $("#desc_produto").val();
    var quantidade = $("#quant_produto").val();
    var preco = $("#preco_produto").val();

    tx.executeSql('INSERT INTO cadastro (nome, descricao, quantidade, preco) VALUES ("' + nome + '", "' + descricao + '", "' + quantidade + '", "' + preco + '")');
}

function cadastro_view() {
    db.transaction(cadastro_view_db, errorDB, sucessDB);
}

//função mostrar dados - visualizar no estoque
function cadastro_view() {
    db.transaction(cadastro_view_db, errorDB, sucessDB);
}

function cadastro_view_db(tx) {
    tx.executeSql('SELECT * FROM cadastro ORDER BY nome', [], cadastro_view_data, errorDB);
}

function cadastro_view_data(tx, results) {
    $("#produto_lista").empty();
    var len = results.rows.length;

    for (var i = 0; i < len; i++) {
        $("#produto_lista").append("<div class='item white mark border-deep-purple-100 margin-button shadow'>" +
            "<tr class='produto_item_lista' id='produto_item_" + results.rows.item(i).id + "'>" +
            "<td class='info'><h3>" + results.rows.item(i).nome + "</h3>" +
            "<p>Quantidade: <label class='text-grey'>" + results.rows.item(i).quantidade + "</label></p></td>" +
            "<div class='right' style='margin-top:-55px;'><button class='icon ion-navicon-round' style='font-size:35px; color:indigo;' onclick='cadastro_update_dados(" + results.rows.item(i).id + ")' > " +
            "</button></div>" +
            "</tr></div><div class='space'></div>");
    }

}

function AbrirID(id) {
    window.open("results.rows.item(i).id");
}

//função de voltar tela
function voltar() {
    window.location.assign("index.html");
}

// funções de visualizar dados na tela de detalhes
function detalhes_view() {
    db.transaction(Detalhes, errorDB, sucessDB);
}

function Detalhes(tx) {
    var produtoId = localStorage.getItem('ProdutoId');
    tx.executeSql('SELECT * FROM cadastro where id=' + produtoId, [], preenche_view_data, errorDB);
}

function preenche_view_data(tx, results) {
    $("#produto_lista").empty();
    var len = results.rows.length;

    for (var i = 0; i < len; i++) {
        $("#produto_id_update").val(results.rows.item(i).id);
        $("#produto_nome_update").val(results.rows.item(i).nome);
        $("#produto_descricao_update").val(results.rows.item(i).descricao);
        $("#produto_quant_update").val(results.rows.item(i).quantidade);
        $("#produto_preco_update").val(results.rows.item(i).preco);
    }
}

function cadastro_update_dados(produto_id) { //botão de detalhes para puxar o id
    localStorage.setItem("ProdutoId", produto_id);
    window.location.assign("Busca_estoque.html");
}

//função de alterar
function update_view() {
    db.transaction(update, errorDB, sucessDB);
}

function update(tx) {
    var produto_id_novo = $("#produto_id_update").val();
    var produto_nome_novo = $("#produto_nome_update").val();
    var produto_desc_novo = $("#produto_descricao_update").val();
    var produto_quant_novo = $("#produto_quant_update").val();
    var produto_preco_novo = $("#produto_preco_update").val();

    tx.executeSql('UPDATE cadastro SET nome = "' + produto_nome_novo + '", descricao = "' + produto_desc_novo + '", quantidade= "' + produto_quant_novo + '", preco = "' + produto_preco_novo + '" WHERE id = "' + produto_id_novo + '"');
}

//função de excluir
function Delete(tx) {
    var produtoId = localStorage.getItem('ProdutoId');
    tx.executeSql('DELETE FROM cadastro WHERE id = "' + produtoId + '"');
}

function deleteItem() {
    alert({
        title: 'Alerta',
        message: 'Deseja excluir o produto?',
        class: 'red',
        buttons: [
            {
                label: 'SIM',
                class: 'red-900',
                onclick: function () {
                    db.transaction(Delete, errorDB, sucessDB);
                    window.location.assign("Estoque.html");
                }
            },
            {
                label: 'NÃO',
                class: 'text-white',
                onclick: function () {
                    closeAlert();
                }
            }
        ]
    });
}


//pesquisar produto
function venda_view() {
    db.transaction(function (transaction) {
        transaction.executeSql('SELECT id,nome FROM cadastro', [], function (tx, results) {
            var len = results.rows.length, i;
            $("#rowCount").append(len);
            for (i = 0; i < len; i++) {
                $("#pesqsuisar").append($('<option>', {
                    value: results.rows.item(i).id,
                    text: results.rows.item(i).nome
                }));
            }
        }, null);
    });
}


//mostrar produto para selecionar na venda
function AbrirID_produto(id) {
    window.open("results.rows.item(i).id");
}

function select() {
    var id = $('#pesqsuisar').val();
    AddProduto(id);
}

function AddProduto(id) {
    db.transaction(function (transaction) {
        transaction.executeSql('SELECT id,nome FROM cadastro where id=' + id, [], function (tx, results) {

            $("#div_mostrar").append("<div class='list' id='produto_venda_" + results.rows.item(i).id + "'>" +
                "<div class='item'>" +
                "<h3 class='text-deep-purple-800'>" + results.rows.item(0).nome + "</h3>" +
                "<div class='list' id='div_quant'>" +
                "<div class='item icon ion-calculator icon-right'>" +
                "<input type=number' min='1' value='1' id='quant_produto'>" +
                "</div>" +
                "</div>" +
                "<div class='right'><button class='icon ion-minus-circled blue' style='padding: 10px;' onclick='remove_produto(" + results.rows.item(0).id + ");'></button></div>" +
                "</div></div>");

        });
    });
}

function remove_produto(produto_id) {
    $("#produto_venda_" + produto_id).remove();
}

//alteração do estoque para vendas
function baixa_estoque(tx) {
    var produtos = new Array();
    var lista = $('#div_mostrar').children().length;
    for (var i = 0; i < lista; i++) {
        var data = new Object();
        var filho = $("#div_mostrar").children().eq(i);
        var id = filho[0].id;
        data.id = id.split("_")[2];
        data.quantidade = filho[0].children[0].children[1].children[0].children[0].value;
        produtos.push(data);
    }

    var sql = '';
    db.transaction(function (transaction) {
        for (var i = 0; i < produtos.length; i++) {
            transaction.executeSql('UPDATE cadastro SET quantidade = quantidade - ' + produtos[i].quantidade + ' WHERE id = ' + produtos[i].id);
        }
    });

}

function venda() {
    alert({
        title: 'Venda',
        message: 'Deseja confirmar essa venda?',
        class: 'deep-purple',
        buttons: [
            {
                label: 'SIM',
                class: 'deep-purple-900',
                onclick: function(){
                    baixa_estoque();
                    voltar();
                }
                
            },
            {
                label: 'NÃO',
                class: 'text-white',
                onclick: function () {
                    closeAlert();
                }
            }
        ]
    });
}


