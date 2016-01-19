<?php
	$page = isset($_GET['page']) ? $_GET['page'] : false;
	if(!$page){
		?>
		<html style="height:100%;">
		<head>
			<title>T2-BUSINESS</title>
		</head>
		<body style="margin:0; padding:0; min-height:100%; display:block; background-image:url(/Content/img/frankSmall.jpg); background-size:contain; background-repeat:no-repeat; background-color:#fff; background-position:center center;">
			
			<div style="font-family:arial; padding:4%; color:#000;">
				<h2>Mockups</h2>			
				<?php
				if ($handle = opendir('mockups/')) {
					while (false !== ($entry = readdir($handle))) {
						if ($entry != "." && $entry != ".." && $entry != ".DS_Store" && $entry != "Icon") {
							echo "<a style='color:#000; text-decoration:none; margin-bottom:10px; display:block;' href='business-index.php?page=$entry'>$entry</a>";
						}
					}
					closedir($handle);
				}
				?>
			</div>
		</body>
		<?php
	}else{
		require_once('t2b-header.html');
		require_once('mockups/'.$page);
		require_once('footer.html');
	}
?>