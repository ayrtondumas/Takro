var serveurUrl = "http://localhost:3000";
var axios = require('axios');
var body = "";
var companyid = "5810cdce60745ad807a5f0ec";






//	------------------
//      TEST CREATE COMANY
//	------------------

var companyUrl    	= "/api/company";
var company_name  	= "Takro";
var company_accro  	= "TKO";
var comany_npa	  	= "1700";
var company_city  	= "Fribourg";
var company_country 	= "Switzerland";
var company_tags  	= ["IT", "Java", "Mecanic", "Electronic"];

body = {
	name : 		company_name,
	accro: 		company_accro,
	npa:		comany_npa,
	city:		company_city,
	country: 	company_country,
	tags:		company_tags,
}

axios.post( serveurUrl+companyUrl, body )
  .then((response)=>{
		if (response.data.status !== "failure") {
			companyid = response.data._id;
			testSignUp();
		}else{
			console.log(response.data.message);
			testSignUp();
		}

  })
  .catch((err)=>{
    console.err("Error company: " + err);
  });



function testSignUp(){

	//	-----------
	// 	TEST SignUp
	//	-----------

	var signupUrl     = "/auth/signup";
	var email         = "ayrtondumas@gmail.com";
	var password      = "1234";
	var firstname     = "Ayrton";
	var lastname      = "Dumas"
	var work          = "Computer scientist"
	var npa           = "1700";
	var city          = "Fribourg";
	var country       = "Switzerland";

	body = {
		email: 			email,
		password: 	password,
		firstname: 	firstname,
		lastname:		lastname,
		work:				work,
		company:		companyid,
		npa:				npa,
		city:				city,
		country:		country
	}

	console.log("Creating new user with company id: " + companyid);

	axios.post( serveurUrl + signupUrl, body)
	  .then((response)=>{
	    console.log(response.data);
	  })
	  .catch((err)=>{
	    console.log(err);
	  })
}

testSignUp();


/*

function testLogin(){
	//	----------
	// 	TEST login
	//	----------

	var loginUrl      = "/auth/login";
	var login_email         = "user@test.com";
	var login_password      = "1234";

	body = {
		email:		login_email,
		password: 	login_password
	}

	axios.post( loginUrl, body)
	  .then((response)=>{
	    conosle.log(response);
	  })
	  .catch((err)=>{
	    conosle.log("Error login: " + err);
	  })

}

*/



/*


//	-----------
// 	TEST upload
//	-----------

var uploadUrl     = "/api/docs/upload";
var filepath      = "/tmp/doc_math.docx";
var filename      = "Document Math";
var file_tags     = ['cos', 'sin', 'tan'];
var classname     = "math's class";




//	------------
//	TEST comment
//	------------

var commentUrl    = "/api/docs/#########/comments";
var comment_text  = "This documentation is great";




//	------------------
// 	TEST vote document
//	------------------

var voteDocUrl     = "/api/docs/########/vote";
var voteDocPayload = 1;




//	-----------------
//	TEST vote comment
//	-----------------

var voteComUrl     = "/api/comment/######/vote";
var voteComPayload = 1;


*/
