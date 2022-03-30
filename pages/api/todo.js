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
  return response.status(200).json(data);
}
