<!DOCTYPE html>
<html>
<head>
  <title>Order PDF</title>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
<table>
  <thead>
  <tr>
    <th>No</th>
    <th>Kode Sparepart</th>
    <th>Nama Sparepart</th>
    <th>Jumlah</th>
  </tr>
  </thead>
  <tbody>
  @foreach ($items as $index => $item)
    <tr>
      <td>{{ $index + 1 }}</td>
      <td>{{ $item['code'] }}</td>
      <td>{{ $item['name'] }}</td>
      <td>{{ $item['quantity'] }}</td>
    </tr>
  @endforeach
  </tbody>
</table>
</body>
</html>
