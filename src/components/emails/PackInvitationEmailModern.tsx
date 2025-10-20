interface PackInvitationEmailProps {
  inviterName: string;
  recipientName: string;
  packName: string;
  packType: 'family' | 'open';
  petType: 'dog' | 'cat' | 'bird' | 'other';
  allowedBreeds?: string[];
  acceptUrl: string;
}

export const PackInvitationEmailModernHTML = ({
  inviterName,
  recipientName,
  packName,
  packType,
  petType,
  allowedBreeds,
  acceptUrl,
}: PackInvitationEmailProps) => {
  const packTypeText = packType === 'family' ? 'Privada' : 'Pública';
  const petEmoji = {
    dog: '🐕',
    cat: '🐱',
    bird: '🦜',
    other: '🐾'
  }[petType];
  const petTypeText = {
    dog: 'Perros',
    cat: 'Gatos',
    bird: 'Aves',
    other: 'Otras mascotas'
  }[petType];

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Invitación a Manada</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .mobile-padding { padding: 20px !important; }
      .mobile-h1 { font-size: 24px !important; }
      .mobile-text { font-size: 14px !important; }
      .mobile-btn { padding: 14px 28px !important; font-size: 15px !important; }
      .mobile-emoji { font-size: 48px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background-color: #f3f4f6;">
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 15px;">
        <!--[if mso]>
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0">
        <tr>
        <td>
        <![endif]-->
        <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
          
          <!-- Hero Section with Emoji -->
          <tr>
            <td align="center" style="padding: 40px 30px 30px 30px; background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);">
              <div style="font-size: 64px; line-height: 1; margin-bottom: 16px;" class="mobile-emoji">${petEmoji}</div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; text-align: center; letter-spacing: -0.3px;" class="mobile-h1">
                ¡Nueva Invitación!
              </h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 35px;" class="mobile-padding">
              
              <!-- Greeting -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #1f2937; text-align: center;" class="mobile-text">
                      Hola <strong style="color: #0d9488;">${recipientName}</strong>,
                    </p>
                    <p style="margin: 12px 0 0 0; font-size: 16px; line-height: 1.5; color: #4b5563; text-align: center;" class="mobile-text">
                      <strong>${inviterName}</strong> quiere que te unas a
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Pack Name Highlight -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <div style="background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%); border: 2px solid #14b8a6; border-radius: 12px; padding: 20px; display: inline-block; min-width: 200px;">
                      <p style="margin: 0; font-size: 20px; font-weight: 700; color: #0d9488; text-align: center; line-height: 1.3;">
                        "${packName}"
                      </p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Pack Details Cards -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 30px;">
                <tr>
                  <td class="mobile-stack" style="width: 50%; padding-right: 8px;" valign="top">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fef3c7; border-radius: 10px; overflow: hidden;">
                      <tr>
                        <td style="padding: 18px; text-align: center;">
                          <div style="font-size: 28px; margin-bottom: 6px;">🏷️</div>
                          <p style="margin: 0; font-size: 12px; color: #92400e; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Tipo</p>
                          <p style="margin: 6px 0 0 0; font-size: 16px; color: #78350f; font-weight: 700;">${packTypeText}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td class="mobile-stack" style="width: 50%; padding-left: 8px;" valign="top">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #dbeafe; border-radius: 10px; overflow: hidden;">
                      <tr>
                        <td style="padding: 18px; text-align: center;">
                          <div style="font-size: 28px; margin-bottom: 6px;">${petEmoji}</div>
                          <p style="margin: 0; font-size: 12px; color: #1e40af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Mascota</p>
                          <p style="margin: 6px 0 0 0; font-size: 16px; color: #1e3a8a; font-weight: 700;">${petTypeText}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${allowedBreeds && allowedBreeds.length > 0 ? `
              <!-- Breeds Section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 20px;">
                <tr>
                  <td style="background-color: #f0fdf4; border-radius: 10px; padding: 18px; border-left: 3px solid #10b981;">
                    <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #065f46; text-transform: uppercase; letter-spacing: 0.5px;">
                      ✓ Razas Permitidas
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #047857; line-height: 1.5;">
                      ${allowedBreeds.join(' • ')}
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding: 32px 0 20px 0;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${acceptUrl}" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="12%" strokecolor="#0d9488" fillcolor="#0d9488">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:600;">Unirme a la Manada</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${acceptUrl}" class="mobile-btn" style="display: inline-block; padding: 16px 36px; background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25); transition: all 0.3s; mso-hide: all;">
                      Unirme a la Manada
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <!-- Footer Note -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #9ca3af; text-align: center;">
                      Si no esperabas esta invitación, puedes ignorar este correo de forma segura.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 35px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 6px 0; font-size: 15px; font-weight: 600; color: #0d9488;">
                      Waggi Pet
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #6b7280; line-height: 1.5;">
                      Cali, Colombia • Conectando mascotas y sus familias
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

// Preview component
export const PackInvitationEmailModernPreview = () => {
  const emailHTML = PackInvitationEmailModernHTML({
    inviterName: "María García",
    recipientName: "Juan",
    packName: "Los Peludos del Parque",
    packType: "family",
    petType: "dog",
    allowedBreeds: ["Golden Retriever", "Labrador", "Beagle"],
    acceptUrl: "https://waggi.app/packs/accept/abc123"
  });

  return (
    <div className="p-8 bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">Diseño Moderno</h2>
        <p className="text-muted-foreground text-center mb-6">Vista previa del correo de invitación</p>
        <div 
          className="bg-background rounded-lg shadow-2xl overflow-hidden"
          dangerouslySetInnerHTML={{ __html: emailHTML }}
        />
      </div>
    </div>
  );
};