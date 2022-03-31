export default async function handler(request, response) {
  const data = [
    {
      id: '1',
      todo: 'Honda PCX',
      isCompleted: false,
      createdAt: '2022-03-30',
    },
    {
      id: '2',
      todo: 'Honda Cub',
      isCompleted: false,
      createdAt: '2022-03-30',
    },
    {
      id: '3',
      todo: 'Honda Click',
      isCompleted: false,
      createdAt: '2022-03-30',
    },
  ];

  switch (request.method) {
    case 'POST':
      console.log(request);
      return response.status(200).json();
    case 'PUT':
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: request.body,
      };
      let updatelist = await fetch(
        `https://todo-32f64-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json`,
        requestOptions
      );
      console.log(updatelist);
      return response.status(200).json('Success');
    case 'DELETE':
      console.log(response);
      return response.status(200).json();
    default:
      let todolist = await fetch(
        `https://todo-32f64-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json`
      );
      return response.status(200).json(await todolist.json());
  }
}
