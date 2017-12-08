<html>

<head>
	<title>
		Laravel JQuery Ajax CRUD with Search Autocomplete and Inline Edit - by Erwin Wahyudi
	</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
	 crossorigin="anonymous">
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

	<style>
		* {
			margin: 0px auto;
			!important/* Aligning all the data to center */
		}
		
	</style>

</head>

<body>

	<br><br><br><br>
    <div class="container">
			<!-- tambah data baru -->
				<div class="form-group row add">
					<div class="col-md-4">
						<input type="text" class="form-control" id="cari" placeholder="Enter name" required>
						<input type="hidden" name="name" id="nameid">
					</div>
					<div class="col-md-3">
						<input type="text" class="form-control" id="priceid" name="price" placeholder="Enter price" required>
					</div>
					<div class="col-md-3">
						<input type="text" class="form-control" id="totalid" name="total" placeholder="Enter total" required>
						<span id="results_count"></span>
					</div>
					{{--  <div class="col-md-2">
						<button class="btn btn-primary" type="submit" id="add">
							<span class="glyphicon glyphicon-plus"></span> ADD
						</button>	

						<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
						
					</div>  --}}
				</div>
				{{ csrf_field() }}
			<!-- ./tambah data baru -->

			<!-- list data -->
				<div class="table-responsive text-center">
					<table class="table table-borderless" id="table">
						<thead>
							<tr>
								<th class="text-center">#</th>
								<th class="text-center">Name</th>
								<th class="text-center">Price</th>
								<th class="text-center">Total</th>
								<th class="text-center">Actions</th>
							</tr>
						</thead>
						<!-- <tbody id="showitem"> 
							<div ></div>
						</tbody> -->
						<tbody>
						@foreach($items as $item)
							<tr class="item-{{ $item->id }}">
								<td><div class="alrt">{{ $item->id }}</div></td>
								<td><input class="form-control item_name" name="item_name" value="{{ $item->name }}" /></td>
								<td><input class="form-control item_price" name="item_price" value="{{ $item->price }}" /></td>
								<td><input class="form-control item_total" name="item_total" value="{{ $item->total }}" /></td>
								<td><button id="edit-item" class="edit-item btn btn-info" data-id="{{ $item->id }}"
										data-name="">
										<span class="glyphicon glyphicon-edit"></span> Edit
									</button>
									<button class="delete-item btn btn-danger"
										data-id="{{ $item->id }}" data-name="{{ $item->name }}">
										<span class="glyphicon glyphicon-trash"></span> Delete
									</button></td>
							</tr>
						@endforeach
						</tbody>
					</table>
				</div>
			<!-- ./list data -->
	</div>


	<!-- Modal untuk delete data -->
	<div id="myModal" class="modal fade" role="dialog">
  		<div class="modal-dialog">
  			<!-- Modal content-->
  			<div class="modal-content">
  				<div class="modal-header">
  					<h4>Delete Data</h4>
  				</div>
  				<div class="modal-body">  					
  					<div class="deleteContent">
  						Anda yakin akan menghapus data <span class="dname"></span> ? <span class="hidden did"></span>
  					</div>
  					<div class="modal-footer">
  						<button type="button" class="btn actionBtn btn-danger delete" data-dismiss="modal">
  							<span id="footer_action_button" class='glyphicon glyphicon-trash'> Delete </span>
  						</button>
  						<button type="button" class="btn btn-warning" data-dismiss="modal">
  							<span class='glyphicon glyphicon-remove'></span> Close
  						</button>
  					</div>
  				</div>
  			</div>
		</div>
	</div>
	<!-- ./ Modal untuk delete data -->

		<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

		<script src="{{ asset('js/my.js') }}"></script>
		

		
		
		</script>
</body>

</html>