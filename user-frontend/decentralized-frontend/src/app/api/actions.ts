"use server";

export async function fetchDataWithToken(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/all/tasks/user`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await  res.json()
  console.log(data)
  return  data
}

export async function getNextTask (token:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/worker/tasks`,{
    method:'GET',
    headers:{
      Authorization:token
    }
  })
  if(!res.ok){
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  console.log(`next task : ${data}`)
  return data;
}