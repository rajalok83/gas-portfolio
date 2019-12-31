    		/*window.addEventListener('load', function() {
		console.log('Page is loaded');

		getPortfolioList();
		});*/
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		function onSuccessPortfolioHomeLoad(portfolios) {
			$('#id_div_status_home').html("");
            $('#id_select_portfolio').html("");
            $('#id_select_portfolio').append($('<option>').val("").text(""))
            $.each(portfolios, function(i, val){
              $('#id_select_portfolio').append($('<option>').val(val).text(val));
            });
		}
		function onSuccessSipLoad(sip) {
			$('#id_div_sip').html("No Records found");
            if(sip.length >0 )
			  $('#id_div_sip').html(build_table("SIP", sip));
			$('#id_div_status_home').html("");
		}

		function onSuccessInsuranceLoad(insurances) {
			$('#id_div_insurance').html("No Records found");
            if(insurances.length >0 )
              $('#id_div_insurance').html(build_table("Insurance", insurances));
            $('#id_div_status_home').html("");
		}
		function onSuccessStocksLoad(stocks) {
            $('#id_div_stocks').html("No Records found");
            if(stocks.length >0 )
              $('#id_div_stocks').html(build_table("Stocks", stocks));
            $('#id_div_status_home').html("");
		}
        function onSuccessPortfolioStockLoad(portfolios) {
            $('#id_select_portfolio_stock').html("");
            $('#id_select_portfolio_stock').append($('<option>').val("").text(""));
            $.each(portfolios, function(i, val){
              $('#id_select_portfolio_stock').append($('<option>').val(val).text(val));
            });
		}
		function onSuccessExchangeStockLoad(exchanges) {
			$('#id_select_exchange_stock').html("");
			$('#id_select_exchange_stock').append($('<option>').val("").text(""));
            $.each(exchanges, function(i, val){
              $('#id_select_exchange_stock').append($('<option>').val(val).text(val));
            });
		}
		function onSuccessPortfolioTxnLoad(portfolios) {
            $('#id_select_portfolio_stocktxn').html("");
			$('#id_select_portfolio_stocktxn').append($('<option>').val("").text(""));
            $.each(portfolios, function(i, val){
              $('#id_select_portfolio_stocktxn').append($('<option>').val(val).text(val));
            });
		}
		function onSuccessExchangeTxnLoad(exchanges) {
            $('#id_select_exchange_stocktxn').html("");
			$('#id_select_exchange_stocktxn').append($('<option>').val("").text(""));
            $.each(exchanges, function(i, val){
              $('#id_select_exchange_stocktxn').append($('<option>').val(val).text(val));
            });
		}
		function onSuccessTransactionLoad(transactions) {
            $('#id_select_transaction_stocktxn').html("");
            $.each(transactions, function(i, val){
              $('#id_select_transaction_stocktxn').append($('<option>').val(val).text(val));
            });
		}
		function onSuccessScriptTxnLoad(scripts) {
            $('#id_select_script_stocktxn').html("");
			$.each(scripts, function(i, val){
              $('#id_select_script_stocktxn').append($('<option>').val(val).text(val));
            });
		}
		function onSuccessNPS1Load(nps1) {}
		function onSuccessNPS2Load(nps2) {}
		function onSuccessEPFLoad(epf) {}
		function onSuccessPPFLoad(ppf) {}
		function onSuccessSecurityLoad(security) {}
		function onSuccessCashLoad(cash) {
			var div_status = document.getElementById('id_div_status_home');
			var div_cash = document.getElementById('id_div_cash');
			var k = 0;
			if (document.getElementById('id_select_portfolio').value == "All")
				k = 1;
			sortCol = 0 + k;
			cash.sort(function (a, b) {
				if (a[sortCol] === b[sortCol]) {
					return 0;
				} else {
					return (a[sortCol] < b[sortCol]) ? -1 : 1;
				}
			});
			for (var i = 0; i < cash.length; i++) {
				var rtrn_dt = new Date(cash[i][7 + k]);
				var end_dt = new Date();
				if (cash[i][7 + k] == "" && cash[i][4 + k] != "") {
					var timeDiff = Math.abs(end_dt.getTime() - new Date(cash[i][4 + k]).getTime());
					var diffMonths = Math.ceil((timeDiff / (1000 * 3600 * 24)) / 30);
					var diffYears = Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
					//Utilities.formatDate(end_dt,"IST","dd-MMM-YYYY")
					cash[i][5 + k] = (end_dt.getDate() <= 9 ? "0" + end_dt.getDate() : end_dt.getDate()) + "-" + months[end_dt.getMonth()] + "-" + end_dt.getFullYear();
					cash[i][8 + k] = cash[i][1 + k] * cash[i][3 + k] * (cash[i][2 + k] == "Yearly" ? diffYears : diffMonths) / 100;
				}
			}
            div_cash.innerHTML = "No Records found";
            if(cash.length >0 )
			   div_cash.innerHTML = build_table("Cash", cash);
			div_status.innerHTML = "";
			filterCashTransactions();
		}
		function onFilterCashRecordsChange(obj) {

			if (obj.value == "cashOnlyCurrent") {
				filterCashTransactions();
			}
			if (obj.value == "cashAllRecords") {
				var tblBaseObj = document.getElementById("id_table_Cash").getElementsByTagName("tbody")[0];
				var rowBaseObj = tblBaseObj.getElementsByTagName("tr");
				for (var i = 0; i < rowBaseObj.length; i++) {
					rowBaseObj[i].hidden = false;
				}
			}
		}
		function filterCashTransactions() {
			var k = 0;
			if (document.getElementById('id_select_portfolio').value == "All")
				k = 1;
			var tblBaseObj = document.getElementById("id_table_Cash").getElementsByTagName("tbody")[0];
			var rowBaseObj = tblBaseObj.getElementsByTagName("tr");
			for (var i = 0; i < rowBaseObj.length; i++) {
				var colBaseObj = rowBaseObj[i].getElementsByTagName("td");
				if (colBaseObj.length > 0)
					if (colBaseObj[7 + k].innerHTML != "")
						rowBaseObj[i].hidden = true;
			}
		}
		function build_table(report, inArr) {
			switch (report) {
			case "Cash":
				var header_array = ["To", "Amount", "RoI Tenure", "RoI", "Start Dt", "End Dt", "Send Dt", "Return Dt", "Amt"];
				break;
			case "Insurance":
				var header_array = ["Policy No.", "Company", "Name", "Type", "Start On", "End On", "Mthd", "Amt", "Sum Assured", "Return Dt", "Return Amt", "Maturity Dt", "Maturity Amt"];
				break;
			case "Sip":
				var header_array = ["Folio No.", "Name", "Total Investment", "Total Units", "Avg. NAV"];
				break;
			case "Stocks":
				var header_array = ["Exchange", "Transaction", "Script ID", "Script Name", "Date", "Units", "Price"];
                console.log(inArr);
				break;
			}
			var built_table = "<table border='1' width='100%'><tr><td width='100%'></table>";
			built_table = "<table border='1' width='100%' id='id_table_" + report + "'>";
			built_table += build_table_header(report, header_array);
			built_table += build_table_data(inArr);
			built_table += "</td></tr></table>";
			return built_table;
		}

		function build_table_data(inArr) {
			var outStr = "";
			for (var i = 0; i < inArr.length; i++) {
				outStr += "<tr>";
				for (var j = 0; j < inArr[i].length; j++) {
					if (isNaN(Number(inArr[i][j]))) {
						if (new Date(inArr[i][j]).toString() !== "Invalid Date")
							outStr += "<td align='right'>" + inArr[i][j] + "</td>";
						else
							outStr += "<td>" + inArr[i][j] + "</td>";
					} else
						outStr += "<td align='right'>" + inArr[i][j] + "</td>";
				}
				outStr += "</tr>";
			}
			return outStr;
		}
		function build_table_header(type, inArr) {
			var portfolio = document.getElementById('id_select_portfolio').value;
			var outStr = "<tr><th style='background-color:#20D5EE;' colspan='" + (portfolio == "All" ? inArr.length + 1 : inArr.length) + "' align='center'>" + type + "</th></tr><tr>";
			if (type == "Cash")
				outStr = "<tr><th style='background-color:#20D5EE;' colspan='" + (portfolio == "All" ? inArr.length + 1 : inArr.length) + "' align='center'>" + type + "</th></tr>" +
					"<tr><th colspan='" + (portfolio == "All" ? inArr.length + 1 : inArr.length) + "' align='center'><table><tr><th><input type='radio' id='cashAllRecords' name='filterCashRecords' value='cashAllRecords' onChange='onFilterCashRecordsChange(this)'/><label for='AllRecords'>Show All Records</label></th>" +
					"<th><input type='radio' id='cashOnlyCurrent' checked name='filterCashRecords' value='cashOnlyCurrent' onChange='onFilterCashRecordsChange(this)'/><label for='OnlyCurrent'>Show Not Returned</label></th></tr></table></th></tr><tr>";
			if (portfolio == "All")
				outStr += "<th style='background-color:#C36AFA;' align='center'>Portfolio</th>";
			for (var i = 0; i < inArr.length; i++) {
				outStr += "<th style='background-color:#C36AFA;' align='center'>" + inArr[i] + "</th>";
			}
			return outStr + "</tr>";
		}

		function onPortfolioSelect() {
			var div_status = document.getElementById('id_div_status_home');
			var div_cash = document.getElementById('id_div_cash');
			var div_stocks = document.getElementById('id_div_stocks');
			var div_sip = document.getElementById('id_div_sip');
			var div_nps1 = document.getElementById('id_div_nps1');
			var div_nps2 = document.getElementById('id_div_nps2');
			var div_epf = document.getElementById('id_div_epf');
			var div_ppf = document.getElementById('id_div_ppf');
			var div_insurance = document.getElementById('id_div_insurance');
			var div_security = document.getElementById('id_div_security');
			var portfolio = document.getElementById('id_select_portfolio').value;
			if (portfolio != "") {
				div_status.innerHTML = "Portfolio selected " + portfolio;
				div_cash.innerHTML = "Loading Cash for " + portfolio;
				div_sip.innerHTML = "Loading Sip for " + portfolio;
				div_insurance.innerHTML = "Loading Insurance for " + portfolio;
				div_stocks.innerHTML = "Loading Stocks for " + portfolio;
				div_nps1.innerHTML = "Loading NPS-1 for " + portfolio;
				div_nps2.innerHTML = "Loading NPS-2 for " + portfolio;
				div_epf.innerHTML = "Loading EPF for " + portfolio;
				div_ppf.innerHTML = "Loading PPF for " + portfolio;
				div_security.innerHTML = "Loading Security for " + portfolio;
				google.script.run.withSuccessHandler(onSuccessCashLoad).getCashList(portfolio);
				google.script.run.withSuccessHandler(onSuccessSipLoad).getSipList(portfolio);
				google.script.run.withSuccessHandler(onSuccessInsuranceLoad).getInsuranceList(portfolio);
				google.script.run.withSuccessHandler(onSuccessStocksLoad).getStocksList(portfolio);
				google.script.run.withSuccessHandler(onSuccessNPS1Load).getNPS1List(portfolio);
				google.script.run.withSuccessHandler(onSuccessNPS2Load).getNPS2List(portfolio);
				google.script.run.withSuccessHandler(onSuccessEPFLoad).getEPFList(portfolio);
				google.script.run.withSuccessHandler(onSuccessPPFLoad).getPPFList(portfolio);
				google.script.run.withSuccessHandler(onSuccessSecurityLoad).getSecurityList(portfolio);
			}
		}
		

		function correctTotal() {
			var qty,
			unit_price,
			cgst,
			sgst,
			brokerage;
			qty = unit_price = cgst = brokerage = 0;
			qty = parseFloat(document.getElementById('id_input_qty_stocktxn').value);
			unit_price = parseFloat(document.getElementById('id_input_unit_price_stocktxn').value);
			var total = document.getElementById('id_input_total_stocktxn');
			total.value = qty * unit_price;
			console.log(total.value);
			cgst = parseFloat(document.getElementById('id_input_c_gst_stocktxn').value);
			sgst = parseFloat(document.getElementById('id_input_s_gst_stocktxn').value);
			brokerage = parseFloat(document.getElementById('id_input_brokerage_stocktxn').value);
			console.log(total.value + " " + parseFloat(cgst) + " " + parseFloat(sgst) + " " + parseFloat(brokerage));
			total.value = qty * unit_price + parseFloat(cgst) + parseFloat(sgst) + parseFloat(brokerage);
		}

		function getMyScripts() {
			var myportfolio = document.getElementById("id_select_portfolio_stocktxn").value;
			var myexchange = document.getElementById("id_select_exchange_stocktxn").value;
			if (myportfolio == undefined || myexchange == undefined) {}
			else {
				google.script.run.withSuccessHandler(onSuccessScriptTxnLoad).getScriptList(myportfolio, myexchange);
			}
		}
		function preventFormSubmit() {
			var forms = document.querySelectorAll('form');
			for (var i = 0; i < forms.length; i++) {
				forms[i].addEventListener('submit', function (event) {
					event.preventDefault();
				});
			}
		}
		function handleFormSubmit(formtype) {
			var formObject = {};
			switch (formtype) {
			case "stockedit":
				formObject["portfolio"] = document.getElementById("id_select_portfolio_stock").value;
				formObject["exchange"] = document.getElementById("id_select_exchange_stock").value;
				formObject["scriptid"] = document.getElementById("id_input_script_id_stock").value;
				formObject["scriptname"] = document.getElementById("id_input_script_name_stock").value;
				google.script.run.withSuccessHandler(updateUrl).processForm("stock record", formObject);
				break;
			case "stocktransaction":
				formObject["portfolio"] = document.getElementById("id_select_portfolio_stocktxn").value;
				formObject["exchange"] = document.getElementById("id_select_exchange_stocktxn").value;
				formObject["script"] = document.getElementById("id_select_script_stocktxn").value;
				formObject["date"] = document.getElementById("id_input_date_stocktxn").value;
				formObject["transaction"] = document.getElementById("id_select_transaction_stocktxn").value;
				formObject["qty"] = document.getElementById("id_input_qty_stocktxn").value;
				formObject["unit_price"] = document.getElementById("id_input_unit_price_stocktxn").value;
				formObject["cgst"] = document.getElementById("id_input_c_gst_stocktxn").value;
				formObject["sgst"] = document.getElementById("id_input_s_gst_stocktxn").value;
				formObject["brokerage"] = document.getElementById("id_input_brokerage_stocktxn").value;
				formObject["total"] = document.getElementById("id_input_total_stocktxn").value
				google.script.run.withSuccessHandler(updateUrl).processForm("stock transaction", formObject);
				break;
			}
		}
		function updateUrl(msg) {
			if (msg.includes("Transaction")){
				var div = document.getElementById('output_stocktxn');
                var clean_form_id="id_form_stoctxn";
            }
			if (msg.includes("Stock")){
				var div = document.getElementById('output_stockedit');
                var clean_form_id="id_form_stockedit";
            }
			div.innerHTML = msg;
			if (msg.includes("added")) {
				div.setAttribute("style", "background-color: green;");
                $('#id_form_stoctxn').trigger("reset");
                $('#id_form_stockedit').trigger("reset");
                alert("Success");
			} else {
				div.setAttribute("style", "background-color: red;");
				alert("Failed");
			}
		}
		//$('.datepicker').pickadate();
		google.script.run.withSuccessHandler(onSuccessPortfolioHomeLoad).getPortfolioList();
		google.script.run.withSuccessHandler(onSuccessPortfolioStockLoad).getPortfolioList();
		google.script.run.withSuccessHandler(onSuccessExchangeStockLoad).getExchangeList();
		google.script.run.withSuccessHandler(onSuccessPortfolioTxnLoad).getPortfolioList();
		google.script.run.withSuccessHandler(onSuccessExchangeTxnLoad).getExchangeList();
		google.script.run.withSuccessHandler(onSuccessTransactionLoad).getTransactionList();
		window.addEventListener('load', preventFormSubmit);
