$(document).ready(function() {
    // block autocomplete data
    var url = "/item/search/"; 
        
        $("#cari").autocomplete({
            source: url,
            minLength: 1,
            delay: 400,
            select: function(event, ui) {
                // ambil nilai dari json
                $("#nameid").val(ui.item.name);					
                $("#priceid").val(ui.item.price);
                $("#totalid").val(ui.item.total);
                // set nilai html untuk hasil total data yg didapat ketika cari
                $('#results_count').html('');
            },
            open: function(event, ui) {
                // hitung dan tampilkan data yg didapat
                var len = $('.ui-autocomplete > li').length;
                $('#results_count').html('(# ' + len + ' data)');
            },
            close: function(event, ui) {
                // reset hasilnya
                var nm = $("#nameid").val();
                $("#cari").val(nm);
                
                $('#results_count').html('');
            },
            // reset lagi jika data tidak ditemukan
            change: function (event, ui) {
                if (ui.item === null) {
                    $(this).val('');
                    $("#nameid").val('');
                    $('#priceid').val('');
                    $('#totalid').val('');
                }					
            }
        });
        
    
        $("#cari").focusout(function() {
            if ($("#cari").val() === '') {
                $("#nameid").val('');
                $("#priceid").val('');
                $("#totalid").val('');
            }
        });
    // ./ block autocomplete data

    
    // block tambah data button ADD
        $("#add").click( function() {
            // var name = $("#nameid").val();
            // console.log(nm);
            $.ajax({
                type: 'post',
                url: '/item/create',
                data: {
                    '_token': $('input[name=_token]').val(),
                    'name': $("#nameid").val(),
                    'price': $('#priceid').val(),
                    'total': $('#totalid').val(),
                },
                success: function(data) {
                    $("#table").prepend('<tr class="item-'+ data.id +'">'+
                            '<td><div class="alrt" style="color:green"><b>'+ data.id +'</b></div></td>'+
                            '<td><input class="form-control item_name" name="item_name" value="'+ data.name +'" /></td>'+
                            '<td><input class="form-control item_price" name="item_price" value="'+ data.price +'" /></td>'+
                            '<td><input class="form-control item_total" name="item_total" value="'+ data.total +'" /></td>'+
                            '<td><button id="edit-item" class="edit-item btn btn-info" data-id="'+ data.id +'" data-name="">'+
                                    '<span class="glyphicon glyphicon-edit"></span> Edit'+
                                '</button>&nbsp;'+
                                '<button class="delete-item btn btn-danger" data-id="'+ data.id +'" data-name="'+ data.name +'">'+
                                    '<span class="glyphicon glyphicon-trash"></span> Delete'+
                                '</button></td>'+
                        '</tr>');
                },
            });
        });
    // ./ block tambah data button ADD

    
    // block edit data per-item
        $('body').on('click','.edit-item',function()  {   
        // $(".edit-item").click( function() {
            var item_id = $(this).data('id');
            var name 	= $('.item-' + item_id).find('.item_name').val();
            var price	= $('.item-' + item_id).find('.item_price').val();
            var total	= $('.item-' + item_id).find('.item_total').val();
            console.log(item_id);
            $.ajax({
                type: 'post',
                url: '/item/edit',
                data: {
                    '_token': $('input[name=_token]').val(),
                    'id': item_id,
                    'name': name,
                    'price': price,
                    'total': total,
                },
                success: function(data) {
                    console.log(data);
                    $('.item-' + item_id).find('.item_name').val(name);
                    $('.item-' + item_id).find('.item_price').val(price);
                    $('.item-' + item_id).find('.item_total').val(total);

                    $('.item-' + item_id).find('.alrt').css({'color': 'green', 'font-weight': 'bold'});
                },
            });
        });
    // ./ block edit data per-item

    // block delete data
        $(document).on('click', '.delete-item', function() {
            // $('.deleteContent').show();
            $('.did').text($(this).data('id'));
            $('.dname').html($(this).data('name'));
            $('#myModal').modal('show');
        });
        $('.modal-footer').on('click', '.delete', function() {
            // var item_id = $(this).data('id');
            // console.log(item_id);
            $.ajax({
                type: 'post',
                url: '/item/delete',
                data: {
                    '_token': $('input[name=_token]').val(),
                    'id': $('.did').text()
                },
                success: function(data) {
                    // $('.item-' + $('.did').text()).remove();
                    $( '.item-' + $('.did').text() ).fadeOut("normal", function() {
                        $(this).remove();
                    });
                }
            });
        });
    // ./block delete data
    
});