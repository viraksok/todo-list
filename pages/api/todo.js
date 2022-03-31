export default async function handler(request, response) {
  const data = [
    {
      id: '1',
      todo: 'Honda PCX',
      isCompleted: false,
      createdAt: Date(),
    },
    {
      id: '2',
      todo: 'Honda Cub',
      isCompleted: false,
      createdAt: Date(),
    },
    {
      id: '3',
      todo: 'Honda Click',
      isCompleted: false,
      createdAt: Date(),
    },
  ];

  const url = `https://todo-32f64-default-rtdb.asia-southeast1.firebasedatabase.app/todo`;

  switch (request.method) {
    case 'POST':
      const requestPost = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
      };
      let postlist = await fetch(url + '.json', requestPost);
      return response.status(200).json('Success');
    case 'PUT':
      const requestUpdate = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
      };
      console.log();
      let updatelist = await fetch(url + '.json', requestUpdate);
      return response.status(200).json('Success');
    case 'DELETE':
      const requestBodyDelete = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
      };
      let deletelist = await fetch(
        url + '/${' + request.body + '}.json',
        requestBodyDelete
      );
      return response.status(200).json('Success');
    default:
      let todolist = await fetch(url + '.json');
      return response.status(200).json(await todolist.json());
  }
}
