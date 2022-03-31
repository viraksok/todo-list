export default function handler(request, response) {
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
      console.log(response);
      return response.status(200).json();
    case 'DELETE':
      console.log(response);
      return response.status(200).json();
    default:
      return response.status(200).json(data);
  }
}
