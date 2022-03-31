export default async function handler(request, response) {
  const url = `https://todo-32f64-default-rtdb.asia-southeast1.firebasedatabase.app/todo`;
  /*Dummay data*/
  const data = [
    {
      id: '0',
      todo: 'Next JS',
      isCompleted: false,
      createdAt: Date(),
    },
    {
      id: '1',
      todo: 'React JS',
      isCompleted: false,
      createdAt: Date(),
    },
    {
      id: '2',
      todo: 'Vue JS',
      isCompleted: false,
      createdAt: Date(),
    },
  ];

  switch (request.method) {
    /*Create new item*/
    case 'POST':
      const requestPost = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
      };
      let postlist = await fetch(url + '.json', requestPost);
      return response.status(200).json('Success');

    /*Edit item*/
    case 'PUT':
      const requestUpdate = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
      };
      let updatelist = await fetch(url + '.json', requestUpdate);
      return response.status(200).json('Success');
    /*Remove item*/
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
    /*Get item*/
    default:
      let todolist = await fetch(url + '.json');
      var resultget = await todolist.json();
      return response.status(200).json(resultget == null ? data : resultget);
  }
}
