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
    tx.executeSql('CREATE TABLE IF NOT EXISTS cadastro (id INTEGER PRIMARY KEY, nome VARCHAR(500), descricao VARCHAR(500), quantidade NUM(3), preco NUM(5))');
}

// comando de inserir dados no banco
function cadastro_insert() {
    db.transaction(cadastro_insert_db, errorDB, sucessDB);
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
    tx.executeSql('SELECT * FROM cadastro', [], cadastro_view_data, errorDB);
}

function cadastro_view_data(tx, results) {
    $("#produto_lista").empty();
    var len = results.rows.length;

    for (var i = 0; i < len; i++) {
        $("#produto_lista").append("<div class='item white mark border-blue-grey-200 margin-button shadow'>" +
            "<tr class='produto_item_lista' id='produto_item_" + results.rows.item(i).id + "'>" +
            "<td class='info'><h3>" + results.rows.item(i).nome + "</h3>" +
            "<p>Quantidade: <label class='text-grey'>" + results.rows.item(i).quantidade + "</label></p></td>" +
            "<div class='right' style='margin-top:-45px;'><button class='right grey-700 icon-text cyan' onclick='cadastro_update_dados(" + results.rows.item(i).id + ")' > " +
            "<i class='ion-navicon-round'></i> Detalhes" +
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

    tx.executeSql('UPDATE cadastro SET nome = "'+produto_nome_novo+'", descricao = "'+produto_desc_novo+'" WHERE id = "'+produto_id_novo+'"');

}



