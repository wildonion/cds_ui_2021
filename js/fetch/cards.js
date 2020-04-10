

const urlParams = new URLSearchParams(window.location.search)
const country = urlParams.get("country")
const lang = urlParams.get("lang")


if(lang == "fa") $('head').append(`<title> موسسه کندو  - CDS Apply | ${country}</title>`);
if(lang == "en") $('head').append(`<title>CANDO Study Abroad Agency | ${country}</title>`);

fetch_cmd = null
if(country != '') fetch_cmd = fetch(`https://panel.cdsapply.com:2017/api/collections/get/post?token=account-3eb37339b9641b90e3f0b73b7cedf6&filter[country]=${country}&sort[_created]=-1&limit=4`)

if(fetch_cmd && (lang == 'en' || lang == 'fa')){
    fetch_cmd
        .then(response => response.json())
        .then(posts => {

        	posts = posts.entries
            if(posts.length==0) $(location).attr('href','https://cdsapply.com')
        	
            for(i = 0; i < posts.length; i++){
        		
                divCard = document.createElement("div")
                divCard.classList.add("col-sm-6", "col-md-4", "col-lg-3", "mt-4")

                cardLink = document.createElement("a")
                cardLink.classList.add("card")

                cardHeader = document.createElement("h4")
                cardHeader.classList.add("card-title", "mt-3", "saheltitle")
                
                cardImg = document.createElement("img")
                cardImg.classList.add("card-img-top")
                cardImg.setAttribute("src", "https://panel.cdsapply.com:2017"+posts[i].logo.path)

                secDiv = document.createElement("div")
                secDiv.classList.add("card-block")

                thDiv = document.createElement("div")
                thDiv.classList.add("card-text")

                fDiv = document.createElement("div")
                fDiv.classList.add("card-footer")

                cardTime = document.createElement("small")
                date = new Date(posts[i]._created)
                var time = '';
                time += date.getUTCDate()-1 + " days - ";
                time += date.getUTCHours() + " hours - ";
                time += date.getUTCMinutes() + " minutes ago ";
                cardTime.innerHTML = time
                


        		if(lang == "en" && posts[i].en_title != ""){
    	    		$('head').append(`<meta name="description" content=${posts[i].tags.join()}>`);
    	    		for(j = 0; j < posts[i].tags.length; j++){
    		            $('head').append(`<meta name="description" content=${posts[i].tags[i]}>`);
    		        }

                    cardHeader.appendChild(document.createTextNode(posts[i].en_title))
                    thDiv.innerHTML = posts[i].en_content
                    thDiv.innerHTML = thDiv.textContent.slice(0,80)+'...'
        			cardLink.href = "https://cdsapply.com/content.html?slug="+posts[i].en_slug+"&id="+posts[i]._id+"&lang=en"
                    cardTime.setAttribute("style", "float: left")
                    cardHeader.setAttribute("style", "float: left")

        		}
        		else if(lang == "fa" && posts[i].title != ""){
        			$('head').append(`<meta name="description" content=${posts[i].tags.join()}>`);
        			for(j = 0; j < posts[i].tags.length; j++){
    		            $('head').append(`<meta name="description" content=${posts[i].tags[i]}>`);
    		        }

                    cardHeader.appendChild(document.createTextNode(posts[i].title))
                    thDiv.innerHTML = posts[i].content
                    thDiv.innerHTML = thDiv.textContent.slice(0,80)+'...'
        			cardLink.href = "https://cdsapply.com/content.html?slug="+posts[i].slug+"&id="+posts[i]._id+"&lang=fa"
                    cardTime.setAttribute("style", "float: right")
                    thDiv.setAttribute("style", "direction: rtl") // TODO : fix the floating font issue!!!!!!
                    cardHeader.setAttribute("style", "float: right")
        		
                } else{
                    $(location).attr('href','https://cdsapply.com')
                }

        		divCard.appendChild(cardLink)
                cardLink.appendChild(cardImg)
                cardLink.appendChild(secDiv)
                secDiv.appendChild(cardHeader)
                secDiv.appendChild(thDiv)
                cardLink.appendChild(fDiv)
                fDiv.appendChild(cardTime)


                document.getElementById("cards").appendChild(divCard)
        		
        	}
        })
} else{
    $(location).attr('href','https://cdsapply.com')
}