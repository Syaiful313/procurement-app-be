export const trackingUpdateTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #007bff;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 0 0 5px 5px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    .info-table td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    .info-table td:first-child {
      font-weight: bold;
      width: 40%;
    }
    .status-old {
      color: #6c757d;
    }
    .status-new {
      color: #28a745;
      font-weight: bold;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Update Tracking Pengadaan Barang</h2>
    </div>
    <div class="content">
      <p>Yth. {{recipientName}},</p>
      <p>Kami informasikan bahwa terdapat pembaruan tracking status untuk pengadaan barang Anda:</p>
      
      <table class="info-table">
        <tr>
          <td>Nama Barang</td>
          <td>{{itemName}}</td>
        </tr>
        <tr>
          <td>Departemen</td>
          <td>{{department}}</td>
        </tr>
        <tr>
          <td>Status Sebelumnya</td>
          <td class="status-old">{{oldTrackingStatus}}</td>
        </tr>
        <tr>
          <td>Status Terbaru</td>
          <td class="status-new">{{newTrackingStatus}}</td>
        </tr>
        <tr>
          <td>Diperbarui Oleh</td>
          <td>{{updatedBy}}</td>
        </tr>
        <tr>
          <td>Tanggal Pembaruan</td>
          <td>{{updateDate}}</td>
        </tr>
      </table>
      
      <p>Terima kasih atas perhatian Anda.</p>
    </div>
    <div class="footer">
      <p>Email ini dikirim secara otomatis oleh Sistem Pengadaan Barang. Mohon tidak membalas email ini.</p>
    </div>
  </div>
</body>
</html>
`;