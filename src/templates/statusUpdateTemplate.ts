export const statusUpdateTemplate = `
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
      margin: 15px 0;
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
    .status-badge {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 4px;
      font-weight: bold;
      color: white;
    }
    .status-waiting {
      background-color: #ffc107;
    }
    .status-prioritas {
      background-color: #17a2b8;
    }
    .status-urgent {
      background-color: #dc3545;
    }
    .status-complement {
      background-color: #6c757d;
    }
    .status-rejected {
      background-color: #343a40;
    }
    .note-box {
      background-color: #f8f9fa;
      border-left: 4px solid #28a745;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
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
      background-color: #007bff;
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
      <h1 class="title">Update Status Pengadaan</h1>
    </div>
    
    <div class="content">
      <p>Halo {{recipientName}},</p>
      
      <p>Status pengadaan barang anda telah diperbarui:</p>
      
      <div class="info-row">
        <span class="label">Nama Barang</span>
        <span class="colon">:</span>
        <span class="value">{{itemName}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Departemen</span>
        <span class="colon">:</span>
        <span class="value">{{department}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Status Baru</span>
        <span class="colon">:</span>
        <span class="value"><strong>{{newStatus}}</strong></span>
      </div>
      
      <div class="info-row">
        <span class="label">Diperbarui Oleh</span>
        <span class="colon">:</span>
        <span class="value">{{updatedBy}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Tanggal Update</span>
        <span class="colon">:</span>
        <span class="value">{{updateDate}}</span>
      </div>
      
      {{#if note}}
      <div class="note-box">
        <strong>Catatan:</strong><br>
        {{note}}
      </div>
      {{/if}}
    </div>
    
    <div class="footer">
      <p>Email ini dikirim secara otomatis oleh sistem sabar app.</p>
      <p>Harap tidak membalas email ini.</p>
    </div>
  </div>
</body>
</html>
`;