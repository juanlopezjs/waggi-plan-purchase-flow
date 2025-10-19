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
  <title>Invitación a Manada</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;">
  <!-- Light Mode Version -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with gradient and illustration -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 40px 40px 60px 40px; position: relative;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="80">
                    <img src="https://placehold.co/60x60/ffffff/0d9488?text=W" alt="Waggi Logo" width="60" height="60" style="display: block; border-radius: 12px;" />
                  </td>
                  <td align="right" style="padding-right: 20px;">
                    <img src="https://placehold.co/150x150/f59e0b/0d9488?text=🐕" alt="Pet" width="150" height="150" style="display: block;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 24px 0; font-size: 32px; font-weight: 700; color: #1f2937;">
                ¡Hola, ${recipientName}!
              </h1>
              
              <p style="margin: 0 0 24px 0; font-size: 18px; line-height: 1.6; color: #4b5563;">
                <strong style="color: #0d9488;">${inviterName}</strong> te ha invitado a unirte a su manada <strong>"${packName}"</strong>
              </p>

              <!-- Pack Requirements Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0fdfa; border-radius: 12px; border: 2px solid #99f6e4; margin: 0 0 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #0d9488;">
                      📋 Requisitos de la manada
                    </h2>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #0f766e;">Tipo de manada:</strong>
                          <span style="display: inline-block; margin-left: 8px; padding: 4px 12px; background-color: ${packType === 'family' ? '#fef3c7' : '#dbeafe'}; color: ${packType === 'family' ? '#92400e' : '#1e40af'}; border-radius: 999px; font-size: 14px; font-weight: 500;">
                            ${packTypeText}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #0f766e;">
                          <strong>Tipo de mascota:</strong> ${petTypeText}
                        </td>
                      </tr>
                      ${allowedBreeds && allowedBreeds.length > 0 ? `
                      <tr>
                        <td style="padding: 8px 0; color: #0f766e;">
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
                  <td align="center" style="padding: 20px 0;">
                    <a href="${acceptUrl}" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(13, 148, 136, 0.25);">
                      Aceptar invitación
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Pet Illustration -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="right" style="padding-top: 20px;">
                    <img src="https://placehold.co/120x120/f59e0b/0d9488?text=🐱" alt="Cat" width="120" height="120" style="display: block;" />
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 1.6; color: #6b7280;">
                Si no esperabas esta invitación, puedes ignorar este mensaje de forma segura.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #fafafa; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
                Powered by Waggi Pet S.A.S. – Cali, Colombia
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Dark Mode Version -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #111827; display: none;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
          
          <!-- Header with gradient and illustration -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 40px 40px 60px 40px; position: relative;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="80">
                    <img src="https://placehold.co/60x60/ffffff/0d9488?text=W" alt="Waggi Logo" width="60" height="60" style="display: block; border-radius: 12px;" />
                  </td>
                  <td align="right" style="padding-right: 20px;">
                    <img src="https://placehold.co/150x150/f59e0b/0d9488?text=🐕" alt="Pet" width="150" height="150" style="display: block;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 24px 0; font-size: 32px; font-weight: 700; color: #f3f4f6;">
                ¡Hola, ${recipientName}!
              </h1>
              
              <p style="margin: 0 0 24px 0; font-size: 18px; line-height: 1.6; color: #d1d5db;">
                <strong style="color: #5eead4;">${inviterName}</strong> te ha invitado a unirte a su manada <strong>"${packName}"</strong>
              </p>

              <!-- Pack Requirements Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #134e4a; border-radius: 12px; border: 2px solid #14b8a6; margin: 0 0 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #5eead4;">
                      📋 Requisitos de la manada
                    </h2>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #5eead4;">Tipo de manada:</strong>
                          <span style="display: inline-block; margin-left: 8px; padding: 4px 12px; background-color: ${packType === 'family' ? '#78350f' : '#1e3a8a'}; color: ${packType === 'family' ? '#fef3c7' : '#dbeafe'}; border-radius: 999px; font-size: 14px; font-weight: 500;">
                            ${packTypeText}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #99f6e4;">
                          <strong>Tipo de mascota:</strong> ${petTypeText}
                        </td>
                      </tr>
                      ${allowedBreeds && allowedBreeds.length > 0 ? `
                      <tr>
                        <td style="padding: 8px 0; color: #99f6e4;">
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
                  <td align="center" style="padding: 20px 0;">
                    <a href="${acceptUrl}" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(13, 148, 136, 0.25);">
                      Aceptar invitación
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Pet Illustration -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="right" style="padding-top: 20px;">
                    <img src="https://placehold.co/120x120/f59e0b/0d9488?text=🐱" alt="Cat" width="120" height="120" style="display: block;" />
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 1.6; color: #9ca3af;">
                Si no esperabas esta invitación, puedes ignorar este mensaje de forma segura.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #111827; border-top: 1px solid #374151;">
              <p style="margin: 0; font-size: 12px; color: #6b7280; text-align: center;">
                Powered by Waggi Pet S.A.S. – Cali, Colombia
              </p>
            </td>
          </tr>
        </table>
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
