export async function getData(){
    const response = await fetch('https://h0fkejytf5.execute-api.us-east-1.amazonaws.com/get_birthdae_rankings');
    const data = response['data'];
    return data;
}

export async function pushData(paparazzo, celebrity){
    const url = "https://upmfm7yzu2.execute-api.us-east-1.amazonaws.com/publish_to_birthdae" + new URLSearchParams({
        paparazzo: paparazzo,
        celebrity: celebrity,
    });
    const response = await fetch(url, {
        method: "POST"
    })
}