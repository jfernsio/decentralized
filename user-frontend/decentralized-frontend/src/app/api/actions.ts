"use server";

export async function fetchDataWithToken(token: string) {
  const res = await fetch("http://localhost:8000/api/user/all/tasks/user", {
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
