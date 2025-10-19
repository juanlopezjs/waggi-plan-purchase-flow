interface PackInvitationEmailProps {
  inviterName: string;
  recipientName: string;
  packName: string;
  packType: 'family' | 'open';
  petType: 'dog' | 'cat' | 'bird' | 'other';
  allowedBreeds?: string[];
  acceptUrl: string;
}

export const PackInvitationEmailHTML = ({
  inviterName,
  recipientName,
  packName,
  packType,
  petType,
  allowedBreeds,
  acceptUrl,
}: PackInvitationEmailProps) => {
  const packTypeText = packType === 'family' ? 'Privada' : 'Pública';
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
    /* Reset básico para emails */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .mobile-padding { padding: 20px !important; }
      .mobile-padding-small { padding: 16px !important; }
      .mobile-h1 { font-size: 24px !important; }
      .mobile-text { font-size: 16px !important; }
      .mobile-btn { padding: 14px 32px !important; font-size: 15px !important; }
      .mobile-img-header { width: 100px !important; height: 100px !important; }
      .mobile-img-small { width: 80px !important; height: 80px !important; }
      .mobile-img-logo { width: 50px !important; height: 50px !important; }
      .mobile-hide { display: none !important; }
      .mobile-center { text-align: center !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; background-color: #f5f5f5;">
  <!-- Light Mode Version -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <!--[if mso]>
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0">
        <tr>
        <td>
        <![endif]-->
        <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with gradient and illustration -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 30px 20px 50px 20px;" class="mobile-padding">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="70" valign="top">
                    <img src="https://placehold.co/60x60/ffffff/0d9488?text=W" alt="Waggi Logo" width="60" height="60" class="mobile-img-logo" style="display: block; border-radius: 12px; max-width: 100%;" />
                  </td>
                  <td align="right" valign="top">
                    <img src="https://placehold.co/150x150/f59e0b/0d9488?text=🐕" alt="Pet" width="150" height="150" class="mobile-img-header" style="display: block; max-width: 100%; height: auto;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;" class="mobile-padding">
              <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 700; color: #1f2937; line-height: 1.2;" class="mobile-h1">
                ¡Hola, ${recipientName}!
              </h1>
              
              <p style="margin: 0 0 20px 0; font-size: 17px; line-height: 1.5; color: #4b5563;" class="mobile-text">
                <strong style="color: #0d9488;">${inviterName}</strong> te ha invitado a unirte a su manada <strong>"${packName}"</strong>
              </p>

              <!-- Pack Requirements Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0fdfa; border-radius: 12px; border: 2px solid #99f6e4; margin: 0 0 20px 0;">
                <tr>
                  <td style="padding: 20px;" class="mobile-padding-small">
                    <h2 style="margin: 0 0 12px 0; font-size: 17px; font-weight: 600; color: #0d9488; line-height: 1.3;">
                      📋 Requisitos de la manada
                    </h2>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 15px;">
                      <tr>
                        <td style="padding: 6px 0;">
                          <strong style="color: #0f766e;">Tipo de manada:</strong>
                          <span style="display: inline-block; margin-left: 6px; margin-top: 4px; padding: 4px 12px; background-color: ${packType === 'family' ? '#fef3c7' : '#dbeafe'}; color: ${packType === 'family' ? '#92400e' : '#1e40af'}; border-radius: 999px; font-size: 13px; font-weight: 500;">
                            ${packTypeText}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #0f766e;">
                          <strong>Tipo de mascota:</strong> ${petTypeText}
                        </td>
                      </tr>
                      ${allowedBreeds && allowedBreeds.length > 0 ? `
                      <tr>
                        <td style="padding: 6px 0; color: #0f766e;">
                          <strong>Razas permitidas:</strong> ${allowedBreeds.join(', ')}
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding: 15px 0;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${acceptUrl}" style="height:50px;v-text-anchor:middle;width:250px;" arcsize="16%" strokecolor="#0d9488" fillcolor="#0d9488">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:600;">Aceptar invitación</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${acceptUrl}" class="mobile-btn" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(13, 148, 136, 0.25); mso-hide: all;">
                      Aceptar invitación
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <!-- Pet Illustration -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="right" class="mobile-center" style="padding-top: 15px;">
                    <img src="https://placehold.co/120x120/f59e0b/0d9488?text=🐱" alt="Cat" width="100" height="100" class="mobile-img-small" style="display: block; max-width: 100%; height: auto; margin: 0 0 0 auto;" />
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0; font-size: 14px; line-height: 1.5; color: #6b7280;">
                Si no esperabas esta invitación, puedes ignorar este mensaje de forma segura.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #fafafa; border-top: 1px solid #e5e7eb;" class="mobile-padding-small">
              <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.5;">
                Powered by Waggi Pet S.A.S. – Cali, Colombia
              </p>
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

  <!-- Dark Mode Version -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #111827; display: none;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <!--[if mso]>
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0">
        <tr>
        <td>
        <![endif]-->
        <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
          
          <!-- Header with gradient and illustration -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 30px 20px 50px 20px;" class="mobile-padding">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="70" valign="top">
                    <img src="https://placehold.co/60x60/ffffff/0d9488?text=W" alt="Waggi Logo" width="60" height="60" class="mobile-img-logo" style="display: block; border-radius: 12px; max-width: 100%;" />
                  </td>
                  <td align="right" valign="top">
                    <img src="https://placehold.co/150x150/f59e0b/0d9488?text=🐕" alt="Pet" width="150" height="150" class="mobile-img-header" style="display: block; max-width: 100%; height: auto;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;" class="mobile-padding">
              <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 700; color: #f3f4f6; line-height: 1.2;" class="mobile-h1">
                ¡Hola, ${recipientName}!
              </h1>
              
              <p style="margin: 0 0 20px 0; font-size: 17px; line-height: 1.5; color: #d1d5db;" class="mobile-text">
                <strong style="color: #5eead4;">${inviterName}</strong> te ha invitado a unirte a su manada <strong>"${packName}"</strong>
              </p>

              <!-- Pack Requirements Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #134e4a; border-radius: 12px; border: 2px solid #14b8a6; margin: 0 0 20px 0;">
                <tr>
                  <td style="padding: 20px;" class="mobile-padding-small">
                    <h2 style="margin: 0 0 12px 0; font-size: 17px; font-weight: 600; color: #5eead4; line-height: 1.3;">
                      📋 Requisitos de la manada
                    </h2>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 15px;">
                      <tr>
                        <td style="padding: 6px 0;">
                          <strong style="color: #5eead4;">Tipo de manada:</strong>
                          <span style="display: inline-block; margin-left: 6px; margin-top: 4px; padding: 4px 12px; background-color: ${packType === 'family' ? '#78350f' : '#1e3a8a'}; color: ${packType === 'family' ? '#fef3c7' : '#dbeafe'}; border-radius: 999px; font-size: 13px; font-weight: 500;">
                            ${packTypeText}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #99f6e4;">
                          <strong>Tipo de mascota:</strong> ${petTypeText}
                        </td>
                      </tr>
                      ${allowedBreeds && allowedBreeds.length > 0 ? `
                      <tr>
                        <td style="padding: 6px 0; color: #99f6e4;">
                          <strong>Razas permitidas:</strong> ${allowedBreeds.join(', ')}
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding: 15px 0;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${acceptUrl}" style="height:50px;v-text-anchor:middle;width:250px;" arcsize="16%" strokecolor="#0d9488" fillcolor="#0d9488">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:600;">Aceptar invitación</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${acceptUrl}" class="mobile-btn" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(13, 148, 136, 0.25); mso-hide: all;">
                      Aceptar invitación
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <!-- Pet Illustration -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="right" class="mobile-center" style="padding-top: 15px;">
                    <img src="https://placehold.co/120x120/f59e0b/0d9488?text=🐱" alt="Cat" width="100" height="100" class="mobile-img-small" style="display: block; max-width: 100%; height: auto; margin: 0 0 0 auto;" />
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0; font-size: 14px; line-height: 1.5; color: #9ca3af;">
                Si no esperabas esta invitación, puedes ignorar este mensaje de forma segura.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #111827; border-top: 1px solid #374151;" class="mobile-padding-small">
              <p style="margin: 0; font-size: 12px; color: #6b7280; text-align: center; line-height: 1.5;">
                Powered by Waggi Pet S.A.S. – Cali, Colombia
              </p>
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

// Example usage for preview
export const PackInvitationEmailPreview = () => {
  const emailHTML = PackInvitationEmailHTML({
    inviterName: "María García",
    recipientName: "Juan",
    packName: "Los Peludos del Parque",
    packType: "family",
    petType: "dog",
    allowedBreeds: ["Golden Retriever", "Labrador", "Beagle"],
    acceptUrl: "https://waggi.app/packs/accept/abc123"
  });

  return (
    <div className="p-8 bg-muted">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Vista previa del correo de invitación</h2>
        <div 
          className="bg-background rounded-lg shadow-lg overflow-hidden"
          dangerouslySetInnerHTML={{ __html: emailHTML }}
        />
      </div>
    </div>
  );
};
