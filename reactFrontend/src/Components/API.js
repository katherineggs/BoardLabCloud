export default class API{

	// Insert an article
	
	static postFunc(body,url){
		return fetch(url,
		{
      		'method':'POST',
      		headers : {
      		    'Content-Type':'application/json'
            },
			body:JSON.stringify(body)
		})
	.then(response => response.json())
	.catch(error => console.log(error))
	}

}