export default async function handler(request, response) {
  const url = `https://todo-32f64-default-rtdb.asia-southeast1.firebasedatabase.app/todo`;
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
      let updatelist = await fetch(
        url + '/' + request.body + '.json',
        requestUpdate
      );
      console.log(url + '/' + request.body + '.json');
      return response.status(200).json('Success');
    case 'DELETE':
      const requestDelete = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
      };
      let deletelist = await fetch(url + '/' + request.body + '.json', {
        method: 'DELETE',
      });
      return response.status(200).json('Success');
    default:
      let todolist = await fetch(url + '.json');
      return response.status(200).json(await todolist.json());
  }
}
