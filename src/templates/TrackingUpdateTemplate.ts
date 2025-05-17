export const trackingUpdateTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      box-sizing: border-box;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #e0e0e0;
      background-color: white;
      color: #333;
    }
    .title {
      color: #333;
      font-size: 24px;
      margin: 0;
    }
    .content {
      padding: 20px 0;
      background-color: white;
    }
    .info-row {
      margin: 15px 0;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .label {
      font-weight: bold;
      color: #666;
      width: 160px;
      flex-shrink: 0;
    }
    .colon {
      color: #666;
      margin: 0 10px;
      font-weight: bold;
      display: inline-block;
    }
    .value {
      color: #333;
      flex: 1;
    }
    .status-old {
      color: #6c757d;
    }
    .status-new {
      color: #28a745;
      font-weight: bold;
    }
    .items-list {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .table-container {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    table {
      width: 100%;
      min-width: 500px; /* Memastikan table cukup lebar untuk memerlukan scroll */
      border-collapse: collapse;
      margin-top: 15px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 2px solid #e0e0e0;
      color: #666;
      font-size: 14px;
    }
    
    /* Responsive styles */
    @media only screen and (max-width: 600px) {
      .container {
        padding: 15px;
      }
      .title {
        font-size: 20px;
      }
      .info-row {
        flex-direction: column;
        margin: 10px 0;
      }
      .label {
        width: 100%;
        margin-bottom: 5px;
      }
      /* Tidak lagi menyembunyikan titik dua */
      .colon {
        margin-left: 0;
        margin-right: 5px;
      }
      .value {
        width: 100%;
      }
      th, td {
        padding: 6px;
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">Update Tracking Pengadaan</h1>
    </div>
    
    <div class="content">
      <p>Halo {{recipientName}},</p>
      
      <p>Terdapat pembaruan tracking status untuk pengadaan barang Anda:</p>
      
      <div class="info-row">
        <span class="label">Departemen</span>
        <span class="colon">:</span>
        <span class="value">{{department}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Status Sebelumnya</span>
        <span class="colon">:</span>
        <span class="value status-old">{{oldTrackingStatus}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Status Terbaru</span>
        <span class="colon">:</span>
        <span class="value status-new">{{newTrackingStatus}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Diperbarui Oleh</span>
        <span class="colon">:</span>
        <span class="value">{{updatedBy}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Tanggal Pembaruan</span>
        <span class="colon">:</span>
        <span class="value">{{updateDate}}</span>
      </div>
      
      <div class="items-list">
        <h3>Daftar Barang :</h3>
        <!-- Dedicated container for scrollable table -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Spesifikasi</th>
                <th>Jumlah</th>
                <th>Satuan</th>
              </tr>
            </thead>
            <tbody>
              {{#each items}}
              <tr>
                <td>{{number}}</td>
                <td>{{itemName}}</td>
                <td>{{specification}}</td>
                <td>{{quantity}}</td>
                <td>{{unit}}</td>
              </tr>
              {{/each}}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>Email ini dikirim secara otomatis oleh sistem sabar app.</p>
      <p>Harap tidak membalas email ini.</p>
    </div>
  </div>
</body>
</html>
`;