import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Modal, Tabs, Tab } from "react-bootstrap";
import Successmsg from "../partner/success";
import Warningmsg from "../partner/warning";
import { URL } from "../URL/url";
import { useTranslation } from 'react-i18next';

function Kiosks() {
  //language
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  let user_name = localStorage.getItem("user_name");
  let display_name = localStorage.getItem("display_name");
  let auth = localStorage.getItem("auth");
  let token = localStorage.getItem("token");
  let reseller_id = localStorage.getItem("reseller_id");
  let customerseq = localStorage.getItem("customerseq");
  let role = localStorage.getItem("role");
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [datar, setDatar] = useState([]);
  const [datacus, setDatacus] = useState([]);
  const [datacusm, setDatacusm] = useState([]);
  const [selectreseller, setSelectreseller] = useState('');
  const [selectcustomer, setSelectcustomer] = useState('');
  const [isOpen, setisOpen] = useState(false);
  const [modelmresellername, setmodelmresellername] = useState('');
  const [modelmcustomername, setmodelmcustomername] = useState('');
  const [modelmprinterip, setmodelmprinterip] = useState('');
  const [modelmprintermodel, setmodelmprintermodel] = useState('');
  const [modelmprinterserial, setmodelmprinterserial] = useState('');
  const [modelmprintermacaddr, setmodelmprintermacaddr] = useState('');
  const [modelmpayreaderip, setmodelmpayreaderip] = useState('');
  const [modelmpayreaderport, setmodelmpayreaderport] = useState('');
  const [modelmseq, setmodelmseq] = useState('');
  const [modelkcurrency, setModelkcurrency] = useState('');
  const [modelkcustomerseq, setModelkcustomerseq] = useState('');
  const [languagecode, setlanguagecode] = useState('');
  const [mPrinterIP, setmPrinterIP] = useState('');
  const [m_Prefix, setm_Prefix] = useState('');
  const [m_PrinterModel, setm_PrinterModel] = useState('');
  const [m_PrinterSerial, setm_PrinterSerial] = useState('');
  const [m_PrinterMAC, setm_PrinterMAC] = useState('');
  const [h_GmissionFaxID, seth_GmissionFaxID] = useState('');
  const [m_Print, setm_Print] = useState('');
  const [m_Copy, setm_Copy] = useState('');
  const [m_Fax, setm_Fax] = useState('');
  const [m_Scan, setm_Scan] = useState('');
  const [pA4c, setpA4c] = useState('');
  const [pA3c, setpA3c] = useState('');
  const [pB4c, setpB4c] = useState('');
  const [pB5c, setpB5c] = useState('');
  const [pA4g, setpA4g] = useState('');
  const [pA3g, setpA3g] = useState('');
  const [pB4g, setpB4g] = useState('');
  const [pB5g, setpB5g] = useState('');
  const [cA4c, setcA4c] = useState('');
  const [cA3c, setcA3c] = useState('');
  const [cB4c, setcB4c] = useState('');
  const [cB5c, setcB5c] = useState('');
  const [cA4g, setcA4g] = useState('');
  const [cA3g, setcA3g] = useState('');
  const [cB4g, setcB4g] = useState('');
  const [cB5g, setcB5g] = useState('');
  const [fA4c, setfA4c] = useState('');
  const [fA3c, setfA3c] = useState('');
  const [fB4c, setfB4c] = useState('');
  const [fB5c, setfB5c] = useState('');
  const [fA4g, setfA4g] = useState('');
  const [fA3g, setfA3g] = useState('');
  const [fB4g, setfB4g] = useState('');
  const [fB5g, setfB5g] = useState('');
  const [sA4c, setsA4c] = useState('');
  const [sA3c, setsA3c] = useState('');
  const [sB4c, setsB4c] = useState('');
  const [sB5c, setsB5c] = useState('');
  const [sA4g, setsA4g] = useState('');
  const [sA3g, setsA3g] = useState('');
  const [sB4g, setsB4g] = useState('');
  const [sB5g, setsB5g] = useState('');
  const [m_PayReaderIP, setm_PayReaderIP] = useState('');
  const [m_PayReaderPort, setm_PayReaderPort] = useState('');
  const [m_GmissionFaxID, setm_GmissionFaxID] = useState('');
  const [m_ScreenMsg, setm_ScreenMsg] = useState('');
  const [vmodelkcustomerseq, setvmodelkcustomerseq] = useState('');
  const [vlanguagecode, setvlanguagecode] = useState('');
  const [vmodelkcurrency, setvmodelkcurrency] = useState('');
  const [vm_ScreenMsg, setvm_ScreenMsg] = useState('');
  const [vm_PayReaderIP, setvm_PayReaderIP] = useState('');
  const [vm_PayReaderPort, setvm_PayReaderPort] = useState('');
  const [vmodelm_Prefix, setvmodelm_Prefix] = useState('');
  const [vmodelm_resellerid, setvmodelm_resellerid] = useState('');
  const [isOpensuccessmsg, setisOpensuccessmsg] = useState('');
  const [isOpensuccessmsgw, setisOpensuccessmsgw] = useState('');
  const [message, setmessage] = useState('');
  const [warmessage, setwarmessage] = useState('');
  const[order,setorder] = useState("ASC");
  let valuekioskinfo = '';
  const searchKiosk = () => {
    //console.log(selectreseller);
    console.log(selectcustomer);
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'jairsjhkgasjhdgahjsfgdjhasdfhafsdjhajgsdhafsdjh',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }

    axios.post(URL + "/GetKioskList", {
      reseller_id: selectreseller,
      customer_id: selectcustomer,
    }, headers).then((response) => {
      console.log(response)
      setData(response.data.data);


    })
  };
  async function getkioskdata() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }

    await axios
      .post(URL + "/GetKioskList", { role: role, reseller_id: '', customer_id: '-1', }, headers)

      .then((response) => {

        setData(response.data.data);
        //console.log(response)


      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  useEffect(() => {
    getkioskdata()
  }, []);

  useEffect(() => {

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }

    axios
      .post(URL + "/GetCustomerList", { role: role, resellerid: reseller_id, customerid: customerseq, }, headers)

      .then((response) => {

        setDatas(response.data.data);
        //console.log(response)


      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })

  }, []);

  async function openModal(resource) {


    setmodelmresellername(resource.mresellername);
    setmodelmcustomername(resource.mcustomername);
    setmodelmprinterip(resource.mprinterip);
    setmodelmprintermodel(resource.mprintermodel);
    setmodelmprinterserial(resource.mprinterserial);
    setmodelmprintermacaddr(resource.mprintermacaddr);
    setmodelmpayreaderip(resource.mpayreaderip);
    setmodelmpayreaderport(resource.mpayreaderport);
    setmodelmseq(resource.mseq);

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }

    await axios.post(URL + "/GetKioskInfo", { printerserial: resource.mprinterserial, printermodel: '', printermac: resource.mprintermacaddr, printerip: '', resellerid: '', customerseq: 0, }, headers)
      .then((response) => {
        //setDatas(response.data.data);               
        //console.log(response)
        valuekioskinfo = response.data.data;

      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
    //alert(valuekioskinfo.printerip);
    setModelkcustomerseq(valuekioskinfo.customerseq);
    setModelkcurrency(valuekioskinfo.currency);
    setmPrinterIP(valuekioskinfo.printerip);
    setm_PrinterModel(resource.mprintermodel);
    setm_PrinterSerial(resource.mprinterserial);
    setm_PrinterMAC(resource.mprintermacaddr);
    seth_GmissionFaxID(valuekioskinfo.gmissionfaxid);
    setm_Print(valuekioskinfo.printenabled);
    setm_Copy(valuekioskinfo.copyenabled);
    setm_Fax(valuekioskinfo.faxenabled);
    setm_Scan(valuekioskinfo.scanenabled);
    setpA4c(valuekioskinfo.A4color1);
    setpA3c(valuekioskinfo.A3color1);
    setpB4c(valuekioskinfo.B4color1);
    setpB5c(valuekioskinfo.B5color1);
    setpA4g(valuekioskinfo.A4gray1);
    setpA3g(valuekioskinfo.A3gray1);
    setpB4g(valuekioskinfo.B4gray1);
    setpB5g(valuekioskinfo.B5gray1);

    setcA4c(valuekioskinfo.A4color2);
    setcA3c(valuekioskinfo.A3color2);
    setcB4c(valuekioskinfo.B4color2);
    setcB5c(valuekioskinfo.B5color2);
    setcA4g(valuekioskinfo.A4gray2);
    setcA3g(valuekioskinfo.A3gray2);
    setcB4g(valuekioskinfo.B4gray2);
    setcB5g(valuekioskinfo.B5gray2);

    setfA4c(valuekioskinfo.A4color3);
    setfA3c(valuekioskinfo.A3color3);
    setfB4c(valuekioskinfo.B4color3);
    setfB5c(valuekioskinfo.B5color3);
    setfA4g(valuekioskinfo.A4gray3);
    setfA3g(valuekioskinfo.A3gray3);
    setfB4g(valuekioskinfo.B4gray3);
    setfB5g(valuekioskinfo.B5gray3);

    setsA4c(valuekioskinfo.A4color4);
    setsA3c(valuekioskinfo.A3color4);
    setsB4c(valuekioskinfo.B4color4);
    setsB5c(valuekioskinfo.B5color4);
    setsA4g(valuekioskinfo.A4gray4);
    setsA3g(valuekioskinfo.A3gray4);
    setsB4g(valuekioskinfo.B4gray4);
    setsB5g(valuekioskinfo.B5gray4);

    setm_PayReaderIP(valuekioskinfo.payreaderip);
    setm_PayReaderPort(valuekioskinfo.payreaderport);
    setm_GmissionFaxID(valuekioskinfo.gmissionfaxid);
    setm_ScreenMsg(valuekioskinfo.screenmsg);
    setm_Prefix(valuekioskinfo.isprefix);
    setlanguagecode(valuekioskinfo.languagecode);
    //new
    setvmodelkcustomerseq(valuekioskinfo.customerseq);
    setvlanguagecode(valuekioskinfo.languagecode);
    setvmodelkcurrency(valuekioskinfo.currency);
    setvm_ScreenMsg(valuekioskinfo.screenmsg);
    setvm_PayReaderIP(valuekioskinfo.payreaderip);
    setvm_PayReaderPort(valuekioskinfo.payreaderport);
    setvmodelm_Prefix(valuekioskinfo.isprefix);
    setvmodelm_resellerid(valuekioskinfo.resellerid);
    //new
    setisOpen(true)
    //set customer

    axios.post(URL + "/GetCustomerList", {
      resellerid: valuekioskinfo.resellerid, customerid: '-1'
    }, headers).then((response) => {
      setDatacusm(response.data.data);
    })
  };
  const closeModal = () => {
    setisOpen(false)
  };

  const SetKioskInfo = () => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }

    axios
      .post(URL + "/SetKioskInfo", {
        seq: modelmseq,
        resellerid: vmodelm_resellerid,
        customerseq: vmodelkcustomerseq,
        languagecode: vlanguagecode,
        currency: vmodelkcurrency,
        isprefix: vmodelm_Prefix,
        payreaderip: vm_PayReaderIP,
        payreaderport: vm_PayReaderPort,
        screenmsg: vm_ScreenMsg,
      }, headers)

      .then((response) => {
        setisOpensuccessmsg(true);
        setmessage("Succeed");
        getkioskdata()
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  };
  const showhideMODAL = () => {
    setisOpensuccessmsg(false);
    setisOpen(false);
  };
  const showhideMODALw = () => {
    setisOpensuccessmsgw(false);
  };

  //partner list
  useEffect(() => {

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }

    axios
      .post(URL + "/GetResellerList", { resellerid: '', }, headers)

      .then((response) => {

        setDatar(response.data.data);
        //console.log(response)


      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })

  }, []);

  //customer list on reseller id

  const getCustomerRecord = (e) => {
    setSelectreseller(e.target.value)
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    axios.post(URL + "/GetCustomerList", {
      resellerid: e.target.value, customerid: '-1'
    }, headers).then((response) => {
      setDatacus(response.data.data);
    })


  };
  const getCustomerdata = (e) => {
    setvmodelm_resellerid(e.target.value)
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2U6OmVwcGF5OjozMTQ1MDFVVEM='
      }
    }
    axios.post(URL + "/GetCustomerList", {
      resellerid: e.target.value, customerid: '-1'
    }, headers).then((response) => {
      setDatacusm(response.data.data);
    })


  };

  //Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }
  //sorting
  const sorting = (col)=>{
    if(order==="ASC"){
      const sorted =[...data].sort((a,b)=>
        a[col].toLowerCase()>b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("DSC");

    }
    if(order==="DSC"){
      const sorted =[...data].sort((a,b)=>
        a[col].toLowerCase()>b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setorder("ASC");

    }
  };


  return (
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <Successmsg msg={message} modal={isOpensuccessmsg} showhide={showhideMODAL}></Successmsg>
      <Warningmsg msg={warmessage} modal={isOpensuccessmsgw} showhide={showhideMODALw}></Warningmsg>

      <div className="container-fluid">
        <nav className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
          <div className="container-fluid py-1 px-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">{t('Home')}</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{t('Management')}</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">{t('Kiosk Management')}</h6>
            </nav>

          </div>
        </nav>

        <div className="container-fluid pt-1 py-4 px-0">
          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-2 px-4">
                <form action="" className="information_form" onSubmit={(e) => e.preventDefault()}>

                  <div className="row mt-3">
                    <div className="col-md-2">
                      <label className="input_label_padding_top">{t('Search')}</label>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <select className="classNameic form-select select_options align-left" onChange={getCustomerRecord} id='selectreseller'>
                          <option value="">{t('Partner')}</option>
                          {datar.map((item, i) => {
                            return <option value={item.resellerid}>{item.displayname}</option>
                          })}

                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <select className="classic form-select select_options align-left padingtop" id='selectcustomer' onChange={(e) => { setSelectcustomer(e.target.value) }}>
                          <option value="">{t('Customer')}</option>
                          {
                            datacus.map((item, i) =>
                              <option value={item.seq}>{item.display_name}</option>
                            )
                          }
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button className="btn btn-outline-success allBtnsize" onClick={searchKiosk}>{t('Search')}</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card p-4">
                <div className="databaseTableSection pt-0">
                  <div className="grayBgColor p-4 pt-2 pb-2">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="font-weight-bolder mb-0 pt-2"><i className="mdi mdi-view-headline"></i> {t('Kiosk Information')}</h6>
                      </div>
                      <div className="col-md-6">
                        <div >

                        </div>
                      </div>
                    </div>
                  </div>




                  <div className="top-space-search-reslute">
                    <div className="tab-content p-4 pt-0 pb-0">
                      <div className="tab-pane active" id="header" role="tabpanel">
                        <div>
                          <div id="datatable_wrapper" className="information_dataTables dataTables_wrapper dt-bootstrap4 table-responsive">


                            <table className="display table-bordered dataTable no-footer mt-6">
                              <thead>
                                <tr role="row">
                                  <th onClick={() => sorting("resellername")} className="text-center sorting_asc tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-sort="ascending" aria-label="Order: activate to sort column descending"><span >{t('Partner')}</span></th>
                                  <th onClick={() => sorting("customername")} className="text-center sorting tabletextalignment" rowspan="2" tabindex="0" aria-controls="list-dt" colspan="1" aria-label="ID: activate to sort column ascending"><span >{t('Customer')}</span></th>

                                  <th className="text-center" colspan="4" rowspan="1">{t('Printer')}</th>
                                  <th className="text-center" colspan="2" rowspan="1">{t('PaymentTerminal')}</th>

                                </tr>
                                <tr role="row">
                                  <th onClick={() => sorting("printerip")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Print&amp;nbsp;Total: activate to sort column ascending">{t('IP')}</th>

                                  <th onClick={() => sorting("printermodel")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Color: activate to sort column ascending">{t('Model')}</th>

                                  <th onClick={() => sorting("printerserial")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Mono: activate to sort column ascending">{t('Serial')}</th>
                                  <th onClick={() => sorting("printermacaddr")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Copy&amp;nbsp;Total: activate to sort column ascending">{t('MAC')}</th>

                                  <th onClick={() => sorting("payreaderip")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Color: activate to sort column ascending">{t('IP')}</th>
                                  <th onClick={() => sorting("payreaderport")} className="text-center sorting" tabindex="0" aria-controls="list-dt" rowspan="1" colspan="1" aria-label="Mono: activate to sort column ascending">{t('Port')}</th>



                                </tr>
                              </thead>
                              <tbody>
                                {currentItems.length > 0 ? currentItems.map((item, i) => {
                                  return <tr key={i} className="odd show-modal" onClick={() => openModal({ mresellername: item.resellername, mcustomername: item.customername, mprinterip: item.printerip, mprintermodel: item.printermodel, mprinterserial: item.printerserial, mprintermacaddr: item.printermacaddr, mpayreaderip: item.payreaderip, mpayreaderport: item.payreaderport, mseq: item.seq })}>
                                    <td>{item.resellername}</td>
                                    <td>{item.customername}</td>
                                    <td>{item.printerip}</td>
                                    <td>{item.printermodel}</td>
                                    <td>{item.printerserial}</td>
                                    <td>{item.printermacaddr}</td>
                                    <td>{item.payreaderip}</td>
                                    <td>{item.payreaderport}</td>

                                  </tr>
                                }) : <tr className="odd"><td valign="top" colSpan="8" className="dataTables_empty">{t('No data available')}</td></tr>}
                              </tbody>
                            </table>
                            <div>
                              <ul className="pageNumbers">
                                <li>
                                  <button
                                    onClick={handlePrevbtn}
                                    disabled={currentPage == pages[0] ? true : false}
                                  >
                                    {t('Prev')}
                                  </button>
                                </li>
                                {pageDecrementBtn}
                                {renderPageNumbers}
                                {pageIncrementBtn}

                                <li>
                                  <button
                                    onClick={handleNextbtn}
                                    disabled={currentPage == pages[pages.length - 1] ? true : false}
                                  >
                                    {t('Next')}
                                  </button>
                                </li>
                              </ul>
                            </div>


                            {/* model1 */}
                            <Modal className='modal-box modalPopupCenter' show={isOpen}>
                              <Modal.Header>
                                <h4 className="modal-title">{t('KioskDetails')}</h4>
                                <button type="button" className="btn-close" onClick={closeModal}>×</button>
                              </Modal.Header>
                              <Modal.Body>
                                <div className="formProgress">
                                  <div className="formtopcont">
                                    <p>{t('Lorem ipsum is a placeholder text commonly used.')}</p>
                                  </div>
                                </div>
                                <div className="formBgcolor">
                                  {/*  */}
                                  <form className="pb-0" onSubmit={(e) => e.preventDefault()}>
                                    <Tabs
                                      defaultActiveKey="home"
                                      transition={false}
                                      id="noanim-tab-example"
                                      className="mb-3"
                                    >
                                      <Tab eventKey="home" title={t('Basic')}>

                                        <div className="formProgress manForm pt-2">

                                          <div className="mb-3 mt-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="email">{t('Partner')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <select className='form-select' value={vmodelm_resellerid} onChange={getCustomerdata}>
                                                  <option value="">{t('Partner')}</option>
                                                  {datar.map((item, i) => {
                                                    return <option value={item.resellerid}>{item.displayname}</option>
                                                  })}
                                                </select>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcost">{t('Customer')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <select className='form-select' onChange={(e) => { setvmodelkcustomerseq(e.target.value) }} defaultValue={modelkcustomerseq}>
                                                  {
                                                    datacusm.map((item, i) =>
                                                      <option value={item.seq}>{item.display_name}</option>
                                                    )
                                                  }
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('DefaultLanguage')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <select className='form-select' onChange={(e) => { setvlanguagecode(e.target.value) }} defaultValue={languagecode}>
                                                  <option value="ko-KR">{t('Korean')}</option>
                                                  <option value="en-US" >{t('English')}</option>

                                                </select>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('CurrencyUnit')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <input type="text" className="form-control" id="m_topupcomment" placeholder="" onChange={(e) => { setvmodelkcurrency(e.target.value) }} name="m_topupcomment" defaultValue={modelkcurrency} />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('CallLocation')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <form action="">
                                                  <div className="row">
                                                    <div className="col-md-6">
                                                      <div className="form-check">
                                                        <input type="radio" className="form-check-input" id="radio1" name="optradio" value="1" checked={m_Prefix === 1} onChange={(e) => { setvmodelm_Prefix(e.target.value) }} />
                                                        <label className="form-check-label" for="radio1">{t('Prefix')}</label>
                                                      </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                      <div className="form-check">
                                                        <input type="radio" className="form-check-input" id="radio2" name="optradio" value="0" checked={m_Prefix === 0} onChange={(e) => { setvmodelm_Prefix(e.target.value) }} />
                                                        <label className="form-check-label" for="radio2">{t('Suffix')}</label>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('MainScreenMessage')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <textarea className="form-control" onChange={(e) => { setvm_ScreenMsg(e.target.value) }} >{m_ScreenMsg}</textarea>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* <div className="formProgressBtn">
                                          <div className="row">
                                              <div className="col-md-5">
                                                <button type="button" className="btn btn-sm" onClick={closeModal}>Cancel</button>
                                              </div>
                                              <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                                <button type="submit" className="btn btn-sm savepopupbtn" onClick={SetKioskInfo}>Save</button>
                                              </div>
                                            </div>
                                          </div>                                                     */}
                                        {/* </form>                                     */}
                                      </Tab>
                                      <Tab eventKey="profile" title={t('Printer')}>
                                        {/* <form className="pb-0" onSubmit={(e)=>e.preventDefault()}> */}
                                        <div className="formProgress manForm pt-2">

                                          <div className="mb-3 mt-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="email">{t('IP address')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <span>{mPrinterIP}</span>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcost">{t('Model name')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <span>{m_PrinterModel}</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('Serial Number')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <span>{m_PrinterSerial}</span>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('mac address')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <span>{m_PrinterMAC}</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('output function')}</label>
                                              </div>
                                              <div className="col-md-8">

                                                <div className="row">
                                                  <div className="col-md-6">
                                                    <div className="form-check">
                                                      <input type="radio" className="form-check-input" id="m_Print1" name="m_Print" value="1" checked={m_Print === 1} />
                                                      <label className="form-check-label" for="m_Print1">
                                                        {t('Used')}
                                                      </label>
                                                    </div>
                                                  </div>

                                                  <div className="col-md-6">
                                                    <div className="form-check">
                                                      <input type="radio" className="form-check-input" id="m_Print2" name="m_Print" value="0" checked={m_Print === 0} />
                                                      <label className="form-check-label" for="m_Print2">
                                                        {t('Not Used')}
                                                      </label>
                                                    </div>
                                                  </div>
                                                </div>

                                              </div>
                                            </div>
                                          </div>
                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('Copy function')}</label>
                                              </div>
                                              <div className="col-md-8">

                                                <div className="row">
                                                  <div className="col-md-6">
                                                    <div className="form-check">
                                                      <input type="radio" className="form-check-input" id="m_Copy1" name="m_Copy" value="1" checked={m_Copy === 1} />
                                                      <label className="form-check-label" for="m_Copy1">
                                                        {t('Used')}
                                                      </label>
                                                    </div>
                                                  </div>

                                                  <div className="col-md-6">
                                                    <div className="form-check">
                                                      <input type="radio" className="form-check-input" id="m_Copy2" name="m_Copy" value="0" checked={m_Copy === 0} />
                                                      <label className="form-check-label" for="m_Copy2">
                                                        {t('Not Used')}
                                                      </label>
                                                    </div>
                                                  </div>
                                                </div>

                                              </div>
                                            </div>
                                          </div>
                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('fax function')}</label>
                                              </div>
                                              <div className="col-md-8">

                                                <div className="row">
                                                  <div className="col-md-6">
                                                    <div className="form-check">
                                                      <input type="radio" className="form-check-input" id="m_Fax1" name="m_Fax" value="1" checked={m_Fax === 1} />
                                                      <label className="form-check-label" for="m_Fax1">
                                                        {t('Used')}
                                                      </label>
                                                    </div>
                                                  </div>

                                                  <div className="col-md-6">
                                                    <div className="form-check">
                                                      <input type="radio" className="form-check-input" id="m_Fax2" name="m_Fax" value="0" checked={m_Fax === 0} />
                                                      <label className="form-check-label" for="m_Fax2">
                                                        {t('Not Used')}
                                                      </label>
                                                    </div>
                                                  </div>
                                                </div>

                                              </div>
                                            </div>
                                          </div>
                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('scan function')}</label>
                                              </div>
                                              <div className="col-md-8">

                                                <div className="row">
                                                  <div className="col-md-6">
                                                    <div className="form-check">
                                                      <input type="radio" className="form-check-input" id="m_Scan1" name="m_Scan" value="1" checked={m_Scan === 1} />
                                                      <label className="form-check-label" for="m_Scan1">{t('Used')}</label>
                                                    </div>
                                                  </div>

                                                  <div className="col-md-6">
                                                    <div className="form-check">
                                                      <input type="radio" className="form-check-input" id="m_Scan2" name="m_Scan" value="0" checked={m_Scan === 0} />
                                                      <label className="form-check-label" for="m_Scan2">
                                                        {t('Not Used')}
                                                      </label>
                                                    </div>
                                                  </div>
                                                </div>

                                              </div>
                                            </div>
                                          </div>

                                        </div>

                                        {/* <div className="formProgressBtn">
                                          <div className="row">
                                              <div className="col-md-5">
                                                <button type="button" className="btn btn-sm" onClick={closeModal}>Cancel</button>
                                              </div>
                                              <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                                <button type="submit" className="btn btn-sm savepopupbtn" >Save</button>
                                              </div>
                                            </div>
                                          </div>                                                     */}
                                        {/* </form>                                       */}
                                      </Tab>
                                      <Tab eventKey="cost" title={t('Cost')}>
                                        {/* <form className="pb-0" onSubmit={(e)=>e.preventDefault()}> */}
                                        <div className="formProgress manForm pt-2">

                                          <div className="mb-3 mt-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="email">{t('Printing cost')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <table className="table table-bordered border">
                                                  <thead>
                                                    <tr>
                                                      <th></th>
                                                      <th>{t('A4')}</th>
                                                      <th>{t('A3')}</th>
                                                      <th>{t('B4')}</th>
                                                      <th>{t('B5')}</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <td>{t('color')}</td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={pA4c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={pA3c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={pB4c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={pB5c} /></td>
                                                    </tr>
                                                    <tr>
                                                      <td>{t('Gray-scale')}</td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={pA4g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={pA3g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={pB4g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={pB5g} /></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcost">{t('Copy Cost')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <table className="table table-bordered border">
                                                  <thead>
                                                    <tr>
                                                      <th></th>
                                                      <th>{t('A4')}</th>
                                                      <th>{t('A3')}</th>
                                                      <th>{t('B4')}</th>
                                                      <th>{t('B5')}</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <td>{t('color')}</td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={cA4c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={cA3c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={cB4c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={cB5c} /></td>
                                                    </tr>
                                                    <tr>
                                                      <td>{t('Gray-scale')}</td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={cA4g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={cA3g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={cB4g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={cB5g} /></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('Fax Cost')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <table className="table table-bordered border">
                                                  <thead>
                                                    <tr>
                                                      <th></th>
                                                      <th>{t('A4')}</th>
                                                      <th>{t('A3')}</th>
                                                      <th>{t('B4')}</th>
                                                      <th>{t('B5')}</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <td>{t('color')}</td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={fA4c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={fA3c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={fB4c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={fB5c} /></td>
                                                    </tr>
                                                    <tr>
                                                      <td>{t('Gray-scale')}</td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={fA4g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={fA3g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={fB4g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={fB5g} /></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcomment">{t('Scan Cost')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <table className="table table-bordered border">
                                                  <thead>
                                                    <tr>
                                                      <th></th>
                                                      <th>{t('A4')}</th>
                                                      <th>{t('A3')}</th>
                                                      <th>{t('B4')}</th>
                                                      <th>{t('B5')}</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <td>{t('color')}</td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={sA4c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={sA3c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={sB4c} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={sB5c} /></td>
                                                    </tr>
                                                    <tr>
                                                      <td>{t('Gray-scale')}</td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={sA4g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={sA3g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={sB4g} /></td>
                                                      <td><input name="printcost" type="text" className="form-control" defaultValue={sB5g} /></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </div>



                                        </div>

                                        {/* <div className="formProgressBtn">
                                          <div className="row">
                                              <div className="col-md-5">
                                                <button type="button" className="btn btn-sm" onClick={closeModal}>Cancel</button>
                                              </div>
                                              <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                                <button type="submit" className="btn btn-sm savepopupbtn" >Save</button>
                                              </div>
                                            </div>
                                          </div>                                                     */}
                                        {/* </form>                                   */}
                                      </Tab>
                                      <Tab eventKey="reader" title={t('Reader')}>
                                        {/* <form className="pb-0" onSubmit={(e)=>e.preventDefault()}> */}
                                        <div className="formProgress manForm pt-2">

                                          <div className="mb-3 mt-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="email">{t('IP address')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <input type="text" className="form-control" onChange={(e) => { setvm_PayReaderIP(e.target.value) }} defaultValue={m_PayReaderIP} />
                                              </div>
                                            </div>
                                          </div>

                                          <div className="mb-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="m_topupcost">{t('port number')}</label>
                                              </div>
                                              <div className="col-md-8">
                                                <input type="text" className="form-control" onChange={(e) => { setvm_PayReaderPort(e.target.value) }} defaultValue={m_PayReaderPort} />
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* <div className="formProgressBtn">
                                          <div className="row">
                                              <div className="col-md-5">
                                                <button type="button" className="btn btn-sm" onClick={closeModal}>Cancel</button>
                                              </div>
                                              <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                                <button type="submit" className="btn btn-sm savepopupbtn" >Save</button>
                                              </div>
                                            </div>
                                          </div>                                                     */}
                                        {/* </form>                                        */}
                                      </Tab>
                                      <Tab eventKey="fax" title={t('Fax id')}>
                                        {/* <form className="pb-0" onSubmit={(e)=>e.preventDefault()}> */}
                                        <div className="formProgress manForm pt-2">

                                          <div className="mb-3 mt-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label className="lablePapding" for="email">{t('jimission multifunction device ID')} </label>
                                              </div>
                                              <div className="col-md-8">
                                                <span>{m_GmissionFaxID}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* <div className="formProgressBtn">
                                          <div className="row">
                                              <div className="col-md-5">
                                                <button type="button" className="btn btn-sm" onClick={closeModal}>Cancel</button>
                                              </div>
                                              <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                                <button type="submit" className="btn btn-sm savepopupbtn" >Save</button>
                                              </div>
                                            </div>
                                          </div>                                                     */}
                                        {/* </form>                                       */}
                                      </Tab>


                                    </Tabs>
                                    <div className="formProgressBtn">
                                      <div className="row">
                                        <div className="col-md-5">
                                          <button type="button" className="btn btn-sm" onClick={closeModal}>{t('Cancel')}</button>
                                        </div>
                                        <div className="col-md-7 d-flex justify-content-end popupbtn_mrgn">
                                          <button type="submit" className="btn btn-sm savepopupbtn ddd" onClick={SetKioskInfo}>{t('Save')}</button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                  {/*  */}
                                </div>

                              </Modal.Body>
                            </Modal>
                            {/* model1 */}


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




      </div>





      <footer className="card footer py-4">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-lg-12 mb-lg-0 mb-4">
              <div className="copyright text-center text-sm text-muted text-lg-center">
                {t('Copyright')} © 2021 <i className="fa fa-heart"></i>
                <a href="#!" className="font-weight-bold" target="_blank">EP Pay</a> {t('All rights reserved')}.
              </div>
            </div>

          </div>
        </div>
      </footer>
    </main>
  );
}
export default Kiosks;