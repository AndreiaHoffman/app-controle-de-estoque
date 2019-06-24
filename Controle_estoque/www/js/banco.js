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

//função mostrar dados - visualizar
function cadastro_view() {
    db.transaction(cadastro_view_db, errorDB, sucessDB);
}

function cadastro_view_db(tx) {
    tx.executeSql('SELECT * FROM cadastro', [], cadastro_view_data, errorDB);
}

//Para Andreia: aqui na hora de vc passar o id como parametro, estava errado ali, eu só acertei o on click
function cadastro_view_data(tx, results) {
    $("#produto_lista").empty();
    var len = results.rows.length;

    for (var i = 0; i < len; i++) {
        $("#produto_lista").append("<div class='item white mark border-blue-grey-200 margin-button shadow'>" +
            "<tr class='produto_item_lista' id='produto_item_" + results.rows.item(i).id + "'>" +
            "<td class='info'><h3>" + results.rows.item(i).nome + "</h3>" +
            "<p>Quantidade: <label class='text-grey'>" + results.rows.item(i).quantidade + "</label></p></td>" +
            "<div class='right' style='margin-top:-45px;'><button class='right grey-700 icon-text cyan' onclick='cadastro_update_dados(" + results.row.item(i).id + ")' > " +
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

function estoque() {

}

//Para Andreia: aqui eu uso esse local storage para gravar o id internamente e depois chamo a pagina
function cadastro_update_dados(produto_id) {
    localStorage.setItem("ProdutoId", produto_id);
    window.location.assign("Busca_estoque.html");
    //var cad_nome_update = $("#produto_item_" + produto_id + ".info h3").html();
    //var cad_quant_update = $("#produto_item_" + produto_id + ".info p").html();

    //$("#produto_id_update").val(produto_id);
    //$("#produto_nome_update").val(produto_nome_update);
    //$("#produto_descricao_update").val(produto_descricao_update);
    // resto...
}

function cadastro_update() {
    db.transaction(cad_update_db, errorDB, sucessDB);
}

function cad_update_db(tx) {
    var cad_id_novo = $("#produto_id_update").val();
    var cad_nome_novo = $("#produto_nome_update").val();
    var cad_desc_novo = $("#produto_descricao_update").val();

    tx.executeSql('UPDATE cadastro SET nome = "' + cad_nome_novo + '", descricao = "' + cad_desc_novo + '" WHERE id="' + cad_id_novo + '"');

}