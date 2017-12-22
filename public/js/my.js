$(document).ready(function() {
    // ########## block autocomplete data ##########
        $("#cari").autocomplete({
            source: '/item/search/',
            minLength: 1,
            delay: 200,
            select: function(event, ui) {
                // ambil nilai dari json
                $("#nameid").val(ui.item.name);					
                $("#priceid").val(ui.item.price);
                $("#quantityid").val(ui.item.quantity);
                $("#discountid").val('0');
                // hitung total harga = price * quantity
                $("#totalid").val(ui.item.price * ui.item.quantity);
                // set nilai html untuk hasil quantity data yg didapat ketika cari
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
                    $('#quantityid').val('');
                }					
            }
        }); 
    
        $("#cari").focusout(function() {
            if ($("#cari").val() === '') {
                $("#nameid").val('');
                $("#priceid").val('');
                $("#quantityid").val('');
            }
        });
    //  ########## ./ block autocomplete data ########## 

    
    // ########## function untuk menghitung total harga setelah diskon ##########
        function set_diskon(discount, price, quantity) {
            var get_total = 0;
            check_persen  = discount.slice(-1);
            
            if( check_persen === '%' ) {
                get_number  = discount.split('%')[0];
                get_diskon  = price - (price *  (get_number / 100));
                get_total   = get_diskon * quantity;
            } else {
                get_total = (price - discount) * quantity;             
            }
            return get_total.toFixed();
        }
    // ########## ./ function untuk menghitung total harga setelah diskon ##########


    // ########## block menghitung total harga sesudah discount ########## 
        $("#discountid,#priceid,#quantityid").keyup(function(e){
            priceid     = $("#priceid").val();
            quantityid  = $("#quantityid").val();
            discountval = $(this).val();  

            $("#totalid").val(set_diskon(discountval, priceid, quantityid));  
        });
    // ########## ./ block menghitung total harga sesudah discount ##########


    
    // ########## block tambah data ketika enter ##########
        $("#cari, #priceid, #quantityid, #discountid").keypress( function(e) {
            if(e.which == 13) 
            {
               $.ajax({
                    type: 'post',
                    url: '/chart/create',
                    data: {
                        '_token': $('input[name=_token]').val(),
                        'name': $("#nameid").val(),
                        'price': $('#priceid').val(),
                        'quantity': $('#quantityid').val(),
                        'discount': $('#discountid').val(),
                        'total': $('#totalid').val(),
                    },
                    success: function(data) {
                        $("#table").prepend('<tr style="background-color:#009688" class="item-'+ data.id +'">'+
                                '<td><div class="alrt" style="color:green"><b>'+ data.id +'</b></div></td>'+
                                '<td><input class="form-control item_name" name="item_name" value="'+ data.name +'" disabled /></td>'+
                                '<td><input class="form-control kecilL item_price" name="item_price" value="'+ data.price +'" /></td>'+
                                '<td><input class="form-control kecilS item_quantity" name="item_quantity" value="'+ data.quantity +'" /></td>'+
                                '<td><input class="form-control kecilL item_discount" name="item_discount" value="'+ data.discount +'" /></td>'+                                
                                '<td><input class="form-control kecilL item_total" name="item_total" value="'+ data.total +'" disabled /></td>'+
                                '<td>'+
                                    '<button class="delete-item btn btn-danger" data-id="'+ data.id +'" data-name="'+ data.name +'">'+
                                        '<span class="glyphicon glyphicon-trash"></span> X'+
                                    '</button></td>'+
                            '</tr>');
                    },
                });
            } else {
                console.log('bukan enter');
            }
        });
    // ########## ./ block tambah data ketika enter ##########

    
    // // block edit data per-item
    //     $('body').on('click','.edit-item',function()  {   
    //     // $(".edit-item").click( function() {
    //         var item_id  = $(this).data('id');
    //         var name 	 = $('.item-' + item_id).find('.item_name').val();
    //         var price	 = $('.item-' + item_id).find('.item_price').val();
    //         var quantity = $('.item-' + item_id).find('.item_quantity').val();
    //         console.log(item_id);
    //         $.ajax({
    //             type: 'post',
    //             url: '/chart/edit',
    //             data: {
    //                 '_token': $('input[name=_token]').val(),
    //                 'id': item_id,
    //                 'name': name,
    //                 'price': price,
    //                 'quantity': quantity,
    //             },
    //             success: function(data) {
    //                 console.log(data);
    //                 $('.item-' + item_id).find('.item_name').val(name);
    //                 $('.item-' + item_id).find('.item_price').val(price);
    //                 $('.item-' + item_id).find('.item_quantity').val(quantity);

    //                 $('.item-' + item_id).find('.alrt').css({'color': 'green', 'font-weight': 'bold'});
    //             },
    //         });
    //     });
    // // ./ block edit data per-item

    // ########## block delete data ########## 
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
                url: '/chart/delete',
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
    //  ########## ./block delete data ########## 



    //  ########## block edit data ########## 
        $('body').on('keyup','.item_price, .item_quantity, .item_discount',function(e)  {
            get_tr_class = $(this).closest('tr').attr('class');
            item_class  = '.' + get_tr_class;

            var id_edit        = $(item_class).find('.alrt').text();
            var name_edit      = $(item_class).find('.item_name').val();
            var price_edit     = $(item_class).find('.item_price').val();
            var quantity_edit  = $(item_class).find('.item_quantity').val();
            var discount_edit  = $(item_class).find('.item_discount').val();            
            var total_edit     = set_diskon(discount_edit, price_edit, quantity_edit);
            
            $(item_class).find('.item_total').val( total_edit );

            console.log('id', id_edit, 'name', name_edit, 'price', price_edit, 'total', total_edit);

            if(e.which == 13) 
            {
                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"').attr('content')
                        }
                    });

                    $.ajax({
                        type: 'post',
                        url: '/chart/edit',
                        data: {
                            // '_token': $('input[name=_token]').val(),
                            'id': id_edit,
                            'price': price_edit,
                            'quantity': quantity_edit,
                            'discount': discount_edit,
                            'total': total_edit,
                        },
                        success: function(data) {
                            console.log(item_class);
                            var pr = toRp(price_edit);
                            $(item_class).find('.item_name').val(name_edit);
                            $(item_class).find('.item_price').val(pr);
                            $(item_class).find('.item_quantity').val(quantity_edit);

                            $(item_class).css({'background-color': '#efefef', 'font-weight': 'bold'});                            
                        },
                    });
            }

            // count all total price
                var tot = 0;
                $('input.item_total').each(function(){  
                    tot += Number( $(this).val() );
                });
                $("#sum_total").text(tot);
                console.log(tot);
            // count all total price
        });
    // ########## ./  block edit data ########## 

  
  
    function toRp(angka){
        var rev     = parseInt(angka, 10).toString().split('').reverse().join('');
        var rev2    = '';
        for(var i = 0; i < rev.length; i++){
            rev2  += rev[i];
            if((i + 1) % 3 === 0 && i !== (rev.length - 1)){
                rev2 += '.';
            }
        }
        // return 'Rp. ' + rev2.split('').reverse().join('') + ',00';
        return rev2.split('').reverse().join('');
    }

    a = toRp( $("#sum_total").text() );
    $("#sum_total").text(a)
    // console.log( convertToRupiah(a) );


    
});