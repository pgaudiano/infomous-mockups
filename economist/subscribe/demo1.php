<?php 
/*
 * Getting the head from the live page to keep css and js includes up to date 
 */

$page = file_get_contents('http://www.economist.com/products/subscribe');

preg_match('/.*<\/head>/ims', $page, $matches);

print $matches[0];

?>

<body class="not-front not-logged-in page-products one-sidebar sidebar-right world-menu business-menu economics-menu printedition-menu science-technology-menu culture-menu">
    <div id="page" class="container">
    <a name="top" id="navigation-top"></a>

    
<div id="header" class="clearfix">

  <div id="header-topstripe" class="clearfix">
          <div id="header-logo">
                  <h2><a href="/"><img src="//media.economist.com/sites/all/themes/econfinal/images/the-economist-logo.gif" alt="The Economist" /></a></h2>
              </div>

    
    <div id="header-main">

          <div id="ec_product_support_wrapper">
  
  <div class="ec_products_support_digital">
    <div class="ec_products_support_label">Digital subscription service centre</div>
    <hr>
          <div class="ec_products_support_email">
        <span class="ec_products_support_label">e-mail:</span> 
        <a href="mailto:americas@digital.economist.com" id="ec_products_support_email_digital">americas@digital.economist.com</a>      </div>

              <div class="ec_products_support_phone">
        <span class="ec_products_support_label">phone:</span> 
        +1 314 447 8091      </div>
      </div>
  
  <div class="ec_products_support_print">
    <div class="ec_products_support_label">Print subscription service centre</div>
    <hr>
          <div class="ec_products_support_email">

        <span class="ec_products_support_label">e-mail:</span> 
        <a href="mailto:customerhelp@economist.com" id="ec_products_support_email_print">customerhelp@economist.com</a>      </div>
              <div class="ec_products_support_phone">
        <span class="ec_products_support_label">phone:</span> 
        +1 314 447 8091      </div>
      </div>
  
  <div style="clear:both"></div>

  
</div>    
    </div><!-- /#header-main -->
  </div><!-- /#header-topstripe -->

  
</div> <!-- /#header -->

    
        <div id="columns" class="clearfix">
              <div id="title-wide" class="clearfix">
          <div class="grid-16 grid-first">
            <h1 id="page-title">Subscribe to <i>The Economist</i></h1>          </div>

                  </div>
                  
	
	
	                 
                  <div id="column-content" class="grid-16 grid-first clearfix">
                                <!-- Create left column on search pages -->
        <div class="products-subscribe clearfix ">

      <div class="clear products-activate">
      <p>Print subscriber? <a href="/subscriptions/activation">Activate online access &raquo;</a></p>
    </div>

    
<div id="products-matrix" class="clear">
  <table summary="The Economist online subscription offer" cellpadding="0" cellspacing="0">
    <thead>
      <tr>
        <th scope="col" class="hide">Features description</th>
        <th scope="col" colspan="2">
          <div id="ec_products_country_selector_wrapper">
            <form action="/products/subscribe/noreg"  accept-charset="UTF-8" method="post" id="ec-products-newui-countries-select-form">

<div><div class="form-item clearfix" id="edit-country-id-1-wrapper">
<select name="country_id" class="form-select" id="edit-country-id-1" ><option value="invalid">Select your country</option><option value="74">United Kingdom</option><option value="73">United States</option><option value="8031">Afghanistan</option><option value="8032">Albania</option><option value="8033">Algeria</option><option value="8034">American Samoa</option><option value="8035">Andorra</option><option value="8036">Angola</option><option value="8037">Anguilla</option><option value="8038">Antigua and Barbuda</option><option value="8039" selected="selected">Argentina</option><option value="8040">Armenia</option><option value="8041">Aruba</option><option value="8042">Australia</option><option value="8043">Austria</option><option value="8044">Azerbaijan</option><option value="8045">Bahamas</option><option value="8046">Bahrain</option><option value="8047">Bangladesh</option><option value="8048">Barbados</option><option value="8050">Belarus</option><option value="8051">Belgium</option><option value="8052">Belize</option><option value="8053">Benin</option><option value="8054">Bermuda</option><option value="8055">Bhutan</option><option value="8056">Bolivia</option><option value="8058">Bosnia-Hercegovina</option><option value="8059">Botswana</option><option value="8060">Brazil</option><option value="7215650">British Indian Ocean Territory</option><option value="8061">Brunei</option><option value="8062">Bulgaria</option><option value="8063">Burkina Faso</option><option value="8064">Burundi</option><option value="8065">Cambodia</option><option value="8066">Cameroon</option><option value="8067">Canada</option><option value="8069">Cape Verde</option><option value="8071">Cayman Islands</option><option value="8072">Central African Republic</option><option value="8073">Chad</option><option value="8074">Chile</option><option value="8075">China</option><option value="7215677">Christmas Island</option><option value="7215652">Cocos (Keeling) Islands</option><option value="8076">Colombia</option><option value="8077">Comoros</option><option value="8078">Congo, Dem Rep of</option><option value="8079">Cook Islands</option><option value="8080">Costa Rica</option><option value="8082">Croatia</option><option value="8083">Cuba</option><option value="8085">Cyprus</option><option value="8086">Czech Republic</option><option value="8087">Denmark</option><option value="8088">Djibouti</option><option value="8089">Dominica</option><option value="8090">Dominican Republic</option><option value="7215654">East Timor</option><option value="8091">Ecuador</option><option value="8092">Egypt</option><option value="8093">El Salvador</option><option value="8094">Equatorial Guinea</option><option value="8095">Eritrea</option><option value="8096">Estonia</option><option value="8097">Ethiopia</option><option value="8099">Falkland Islands</option><option value="8098">Faroe Islands</option><option value="8100">Fiji</option><option value="8101">Finland</option><option value="8102">France</option><option value="8103">French Guiana</option><option value="8104">French Polynesia</option><option value="7215655">French Southern Territories</option><option value="8105">Gabon</option><option value="8106">Gambia</option><option value="8107">Georgia</option><option value="8108">Germany</option><option value="8109">Ghana</option><option value="8110">Gibraltar</option><option value="8111">Greece</option><option value="8112">Greenland</option><option value="8113">Grenada</option><option value="8114">Guadeloupe</option><option value="8115">Guam</option><option value="8116">Guatemala</option><option value="8117">Guinea</option><option value="8118">Guinea-Bissau</option><option value="8119">Guyana</option><option value="8120">Haiti</option><option value="7215657">Heard Island and McDonald Is</option><option value="8121">Honduras</option><option value="8122">Hong Kong</option><option value="8123">Hungary</option><option value="8124">Iceland</option><option value="8125">India</option><option value="8126">Indonesia</option><option value="8127">Iran</option><option value="8128">Iraq</option><option value="75">Ireland</option><option value="8129">Israel</option><option value="8130">Italy</option><option value="7215659">Ivory Coast</option><option value="8131">Jamaica</option><option value="8132">Japan</option><option value="8133">Jordan</option><option value="8134">Kazakhstan</option><option value="8135">Kenya</option><option value="8136">Kirgizstan</option><option value="8137">Kiribati</option><option value="8138">Korea, North</option><option value="8139">Korea, Republic of</option><option value="7239531">Kosovo</option><option value="8140">Kuwait</option><option value="8141">Laos</option><option value="8142">Latvia</option><option value="8143">Lebanon</option><option value="8144">Lesotho</option><option value="8145">Liberia</option><option value="8146">Libya</option><option value="8147">Liechtenstein</option><option value="8148">Lithuania</option><option value="8149">Luxembourg</option><option value="8150">Macao</option><option value="8151">Macedonia, FYR</option><option value="8152">Madagascar</option><option value="8153">Malawi</option><option value="8154">Malaysia</option><option value="8155">Maldives</option><option value="8156">Mali</option><option value="8157">Malta</option><option value="8158">Marshall Islands</option><option value="8159">Martinique</option><option value="8160">Mauritania</option><option value="8161">Mauritius</option><option value="8162">Mayotte</option><option value="8163">Mexico</option><option value="8164">Micronesia</option><option value="8166">Moldova</option><option value="8167">Monaco</option><option value="8168">Mongolia</option><option value="7215660">Montenegro</option><option value="8169">Montserrat</option><option value="8170">Morocco</option><option value="8171">Mozambique</option><option value="8173">Myanmar</option><option value="8174">Namibia</option><option value="8175">Nauru</option><option value="8176">Nepal</option><option value="8177">Netherlands</option><option value="7215661">Netherlands Antilles</option><option value="8179">New Caledonia</option><option value="8180">New Zealand</option><option value="8181">Nicaragua</option><option value="8182">Niger</option><option value="8183">Nigeria</option><option value="7215663">Norfolk Island</option><option value="8184">Norway</option><option value="8185">Oman</option><option value="8186">Pakistan</option><option value="7215665">Palau, Republic of</option><option value="7215666">Palestine</option><option value="8187">Panama</option><option value="8188">Papua New Guinea</option><option value="8189">Paraguay</option><option value="8190">Peru</option><option value="8191">Philippines</option><option value="8192">Pitcairn Island</option><option value="8193">Poland</option><option value="8194">Portugal</option><option value="8195">Puerto Rico</option><option value="8196">Qatar</option><option value="8197">Reunion</option><option value="8198">Romania</option><option value="8199">Russia</option><option value="8200">Rwanda</option><option value="8202">Saint Helena</option><option value="8203">Saint Kitts and Nevis</option><option value="8204">Saint Lucia</option><option value="8206">Saint Vincent and Grenadines</option><option value="7215668">Samoa</option><option value="8209">Sao Tome and Principe</option><option value="8210">Saudi Arabia</option><option value="8212">Senegal</option><option value="7215669">Serbia</option><option value="8213">Seychelles</option><option value="8214">Sierra Leone</option><option value="8215">Singapore</option><option value="8216">Slovakia</option><option value="8217">Slovenia</option><option value="8218">Solomon Islands</option><option value="8219">Somalia</option><option value="8220">South Africa</option><option value="7215670">South Georgia</option><option value="8221">Spain</option><option value="8222">Sri Lanka</option><option value="7215671">St Helena</option><option value="7215672">St Martin</option><option value="8223">Sudan</option><option value="8224">Suriname</option><option value="8225">Swaziland</option><option value="8226">Sweden</option><option value="8228">Switzerland</option><option value="8229">Syria</option><option value="8231">Taiwan</option><option value="8232">Tajikistan</option><option value="8233">Tanzania</option><option value="8234">Thailand</option><option value="8235">Togo</option><option value="7215673">Tokelau</option><option value="8236">Tonga</option><option value="8237">Trinidad and Tobago</option><option value="8238">Tunisia</option><option value="8239">Turkey</option><option value="8240">Turkmenistan</option><option value="8241">Turks and Caicos Islands</option><option value="8242">Tuvalu</option><option value="8244">Uganda</option><option value="8245">Ukraine</option><option value="8246">United Arab Emirates</option><option value="8247">Uruguay</option><option value="7215674">US Minor Outlying Is</option><option value="8248">Uzbekistan</option><option value="8249">Vanuatu</option><option value="8250">Venezuela</option><option value="8251">Vietnam</option><option value="8252">Virgin Islands, British</option><option value="8253">Virgin Islands, US</option><option value="8256">Yemen</option><option value="8259">Zambia</option><option value="8260">Zimbabwe</option></select>

</div>
<input type="hidden" name="noreg" id="edit-noreg-1" value="1"  />
<input type="submit" name="op" id="edit-submit" value="Select"  class="form-submit" />
<input type="hidden" name="form_build_id" id="form-f843624cd875e6268b099013fe57ebf0" value="form-f843624cd875e6268b099013fe57ebf0"  />
<input type="hidden" name="form_id" id="edit-ec-products-newui-countries-select-form" value="ec_products_newui_countries_select_form"  />

</div></form>
            Change country            <div style="clear:both"></div>
          </div>
          <div id="product_form_wrapper">
            <form action="/products/subscribe/noreg"  accept-charset="UTF-8" method="post" id="ec-products-newui-list-all">
<div><table id="ec_product_matrix_prices">

<tbody>
 <tr class="product_matrix_title_row odd"><td class="product_price_cell_digital">Digital subscription</td><td>Print subscription <div>(includes digital)</div></td> </tr>
 <tr class="even"><td class="product_price_cell_digital"><div class="form-item clearfix" id="edit-digital-1-wrapper">
<input type="radio" id="edit-digital-1" name="digital" value="1"   class="form-radio" /> <label class="option" for="edit-digital-1">51 week subscription for <span class="ec-products-price ">USD <span class="ec-products-price-value">110</span></span></label>
</div>
</td><td class="product_price_cell_print"><div class="form-item clearfix" id="edit-print-1-wrapper">
<input type="radio" id="edit-print-1" name="print" value="1"   class="form-radio" /> <label class="option" for="edit-print-1">51 week subscription for <span class="ec-products-price ">USD <span class="ec-products-price-value">270</span></span></label>

</div>
</td> </tr>
 <tr class="product_matrix_last_row odd"><td class="product_price_cell_digital"><input type="submit" name="digital_submit" id="edit-subscribe" value="SUBSCRIBE"  class="form-submit" />
</td><td><input type="submit" name="print_submit" id="edit-subscribe-1" value="SUBSCRIBE"  class="form-submit" />
</td> </tr>
</tbody>
</table>
<div class="form-radios"></div><div class="form-radios"></div><input type="hidden" name="noreg" id="edit-noreg" value="1"  />
<input type="hidden" name="country_id" id="edit-country-id" value="8039"  />
<input type="hidden" name="form_build_id" id="form-98193d9ba6a90006c9d46a934d9b6db2" value="form-98193d9ba6a90006c9d46a934d9b6db2"  />
<input type="hidden" name="form_id" id="edit-ec-products-newui-list-all" value="ec_products_newui_list_all"  />

</div></form>
          </div>

        </th>
      <th scope="col" class="last-col"></th>
      </tr>
    </thead>

    <tbody>

      <tr class="first-row odd">
        <td scope="row" class="first-col">
          <div class="service-wrapper">

            <p>
              <span>Online access to print edition articles</span>
              <span class="service-description">Full access to all articles from <i>The Economist</i> print edition</span>
            </p>
          </div>
        </td>

        <td><span class="included">Included</span></td>
        <td><span class="included">Included</span></td>
        <td class="last-col"></td>
      </tr>

      <tr>
        <td scope="row" class="first-col">
          <div class="service-wrapper">

            <p>
              <span><i>The Economist</i> on Android (2.x), iPhone and iPad</span>
              <span class="service-description double-line"><i>The Economist</i> apps operate on iPhone, iPod touch, iPad and Android phones and small/medium tablets running OS 2.x</span>
            </p>
          </div>
        </td>

        <td><span class="included">Included</span></td>
        <td><span class="included">Included</span></td>
        <td class="last-col"></td>
      </tr>

      <tr class="odd">
        <td scope="row" class="first-col">
          <div class="service-wrapper">

            <p>
              <span>Audio edition</span>
              <span class="service-description  double-line">Downloadable audio recordings of all articles from <i>The Economist</i> print edition</span>
            </p>
          </div>
        </td>

        <td><span class="included">Included</span></td>
        <td><span class="included">Included</span></td>
        <td class="last-col"></td>
      </tr>

      <tr>
        <td scope="row" class="first-col">
          <div class="service-wrapper">

            <p>
              <span>Online-only content</span>
              <span class="service-description">Blogs, debates, news and commentary from our editorial team</span>
            </p>
          </div>
        </td>
        <td><span class="included">Included</span></td>

        <td><span class="included">Included</span></td>
        <td class="last-col"></td>
      </tr>

      <tr class="odd">
        <td scope="row" class="first-col">
          <div class="service-wrapper">
            <p>
              <span>Full community participation</span>

              <span class="service-description double-line">Engage with other Economist readers by commenting on articles, blogs, debates and online forums</span>
            </p>
          </div>
        </td>
        <td><span class="included">Included</span></td>
        <td><span class="included">Included</span></td>
        <td class="last-col"></td>

      </tr>

      <tr class="last-row">
        <td scope="row" class="first-col">
          <div class="service-wrapper">
            <p>
              <span>Delivery of each week’s print edition</span>
              <span class="service-description double-box"><strong>Weekly delivery of <i>The Economist</i> newspaper</strong> <i>Not included with digital subscription</i></span>

            </p>
          </div>
        </td>
        <td><span class="not-included">Not Included</span></td>
        <td><span class="included">Included</span></td>
        <td class="last-col"></td>
      </tr>

    </tbody>
  </table>

</div>


</div>
              </div> <!-- /#column-content -->

      
      
    </div> <!-- /#columns -->
    
    <div id="infomous" class="infomous"></div>
  <script type="text/javascript">
    var vars = {
      width: "960",
      height: "250",
      setInterfaceType: "widget",
      "query:test" : 1,
      feeds: "http://www.economist.com/rss/international_rss.xml|http://www.economist.com/rss/united_states_rss.xml|http://www.economist.com/rss/business_rss.xml"
   }
  </script>
	<script type="text/javascript" src="client/embed.js"></script>
	<br/><br/>
    <iframe name="infomous-target" id="infomous-target" width="960" height="400" frameborder="0"></iframe>

    <div id="footer">
            <div id="block-ec_ads-slider_ad" class="block block-ec_ads">
    <div class="content clearfix">
    <!-- Site: Web.  Zone: misc |  --> <script language="JavaScript" type="text/javascript">document.write('<script language="JavaScript" src="//ad.doubleclick.net/adj/teg.fmsq/none;subs=n;wsub=n;sdn=n;pos=slider;sz=1x1;tile=12;ord=' + random_ad_nr + '?" type="text/javascript"><\/script>')</script><noscript><a href="//ad.doubleclick.net/jump/teg.fmsq/none;subs=n;wsub=n;sdn=n;pos=slider;sz=1x1;tile=12;ord=256864095?"><img src="//ad.doubleclick.net/ad/teg.fmsq/none;subs=n;wsub=n;sdn=n;pos=slider;sz=1x1;tile=12;ord=256864095?" width="1" height="1" border="0" alt=""></a></noscript>  </div>
</div>
      
      <div id="footer-stripes">

  
  <div id="footer-stripe-bottom" class="clearfix">

    <ul>
      <li>Copyright &copy; The Economist Newspaper Limited 2012. All rights reserved.</li>
              <li><a href="http://www.economist.com/legal/terms-of-use#9" class="line">Legal disclaimer</a></li>
              <li><a href="/help/accessibilitypolicy" class="line">Accessibility</a></li>
              <li><a href="http://www.economistgroup.com/results_and_governance/governance/Privacy" class="line">Privacy policy</a></li>
              <li><a href="/digitaledition/tnc" class="line">Terms of use</a></li>

              <li class="right-link"><a href="/help">Help</a></li>
    </ul>
  </div>

</div>
    </div> <!-- /#footer -->

  </div> <!-- /#page -->
  

<!-- Quantcast Tag -->
<script type="text/javascript">
var _qevents = _qevents || [];

(function() {
var elem = document.createElement('script');
elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
elem.async = true;
elem.type = "text/javascript";
var scpt = document.getElementsByTagName('script')[0];
scpt.parentNode.insertBefore(elem, scpt);
})();

_qevents.push({
qacct:"p-a8GHW19EK4IzY"
});
</script>

<noscript>
<div style="display:none;">
<img src="//pixel.quantserve.com/pixel/p-a8GHW19EK4IzY.gif" border="0" height="1" width="1" alt="Quantcast"/>
</div>
</noscript>
<!-- End Quantcast tag -->

<!--
    SiteCatalyst code version: H.13    Copyright 1997-2009 Omniture, Inc.
    More info available at http://www.omniture.com
-->
<script language="javascript" type="text/javascript">var s_account = 'economistcomprod';
</script><script language="javascript" src="/sites/all/modules/ec_omniture/ec_omniture_s_code.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript">
  s.prop41="";
s.prop42="";
s.pageName="subscription_barrier_noreg";
s.pageType="";
s.server="economist.com";
s.channel="";
s.prop1="";
s.prop2="";
s.prop3="";
s.prop4="subscription_barrier";
s.prop5="";
s.prop6="";
s.prop7="";
s.prop11="not logged in";
s.prop12="nonuser";
s.prop13="anonymous";
s.prop14="";
s.prop15="";
s.prop25="drupal";
s.prop26="";
s.prop31="";
s.hier1="";
s.state="";
s.zip="";
  var s_code=s.t();if(s_code)document.write(s_code)
</script>
<script language="JavaScript" type="text/javascript">
   if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-');
</script>
<noscript>
  <a href="http://www.omniture.com" title="Web Analytics">
    <img src="//stats.economist.com/b/ss/economistcomprod/1/H.20.3--NS/0" height="1" width="1" border="0" alt="" />
  </a>

</noscript>
<!--
    End SiteCatalyst code version: H.13-->
<script language="javascript" type="text/javascript" charset="windows-1252" src="/sites/all/modules/ec_opinionlab/js/oo_engine.min.js"></script><script language="javascript" type="text/javascript" charset="windows-1252" src="/sites/all/modules/ec_opinionlab/js/oo_conf.js"></script><script type="text/javascript" src="http://media.economist.com/sites/default/files/js/js_d40c1fa40b6e3958124d66e7b1dfb48d.js"></script>
<script type="text/javascript">
<!--//--><![CDATA[//><!--
jQuery.extend(Drupal.settings, {"googleCSE":{"language":"en"}});
//--><!]]>
</script>
<script type="text/javascript">
<!--//--><![CDATA[//><!--
var _gaq = _gaq || [];_gaq.push(["_setAccount", "UA-2144733-16"]);_gaq.push(["_trackPageview"]);(function() {var ga = document.createElement("script");ga.type = "text/javascript";ga.async = true;ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga, s);})();
//--><!]]>
</script>
  </body>
</html>
