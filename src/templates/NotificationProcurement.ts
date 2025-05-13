export const notificationProcurementTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #e0e0e0;
    }
    .title {
      color: #333;
      font-size: 24px;
      margin: 0;
    }
    .content {
      padding: 20px 0;
    }
    .info-row {
      margin: 10px 0;
      display: flex;
      align-items: flex-start;
    }
    .label {
      font-weight: bold;
      color: #666;
      width: 140px;
      flex-shrink: 0;
    }
    .colon {
      color: #666;
      margin: 0 10px;
      font-weight: bold;
    }
    .value {
      color: #333;
      flex: 1;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 2px solid #e0e0e0;
      color: #666;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">Notifikasi Pengajuan Baru</h1>
    </div>
    
    <div class="content">
      <p>Halo {{recipientName}},</p>
      
      <p>Ada pengajuan procurement baru yang memerlukan perhatian Anda:</p>
           
      <div class="info-row">
        <span class="label">Diajukan oleh</span>
        <span class="colon">:</span>
        <span class="value">{{username}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Tanggal</span>
        <span class="colon">:</span>
        <span class="value">{{date}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Departemen</span>
        <span class="colon">:</span>
        <span class="value">{{department}}</span>
      </div>
          
      <div class="info-row">
        <span class="label">Nama Barang</span>
        <span class="colon">:</span>
        <span class="value">{{itemName}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Spesifikasi</span>
        <span class="colon">:</span>
        <span class="value">{{specification}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Jumlah</span>
        <span class="colon">:</span>
        <span class="value">{{quantity}}</span>
      </div>

      <div class="info-row">
        <span class="label">Satuan</span>
        <span class="colon">:</span>
        <span class="value">{{unit}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Keterangan</span>
        <span class="colon">:</span>
        <span class="value">{{description}}</span>
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