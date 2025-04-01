import { useState } from 'react';

const CreateIndexAtlas = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const response = await fetch('/api/indexmongo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });
      const data = await response.json();
      setMessage(data.message || 'Índices creados con éxito.');
    } catch (error) {
      setMessage('Error al crear los índices o JSON inválido.');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear Índices en MongoDB Atlas</h2>
      <textarea
        className="border p-2 w-full mb-4 h-40"
        placeholder='{"collectionName": [{"field": "campo", "type": "text", "unique": true}]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button className="bg-green-500 text-white p-2 w-full mt-2" onClick={handleSubmit}>
        Crear Índices
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default CreateIndexAtlas;





// {
//     "indexes": {
//       "companies": [
//         {
//           "field": "companyName",
//           "type": "text",
//           "options": {
//             "unique": true,
//             "name": "company_name_text_idx",
//             "collation": {
//               "locale": "es",
//               "strength": 2
//             }
//           }
//         },
//         {
//           "field": "folderName",
//           "type": "1",
//           "options": {
//             "name": "folder_name_idx"
//           }
//         },
//         {
//           "field": "status_Companies",
//           "type": "1",
//           "options": {
//             "name": "status_idx"
//           }
//         },
//         {
//           "field": "paymentLevel",
//           "type": "1",
//           "options": {
//             "name": "payment_level_idx"
//           }
//         },
//         {
//           "field": "createAt",
//           "type": "-1",
//           "options": {
//             "name": "created_at_desc_idx"
//           }
//         },
//         {
//           "field": "updateAt",
//           "type": "-1",
//           "options": {
//             "name": "updated_at_desc_idx"
//           }
//         },
//         {
//           "field": "hojas.Hoja1.Name",
//           "type": "text",
//           "options": {
//             "name": "menu_item_name_text_idx"
//           }
//         },
//         {
//           "field": "hojas.Hoja1.Section",
//           "type": "1",
//           "options": {
//             "name": "menu_section_idx"
//           }
//         },
//         {
//           "field": "Info.phone",
//           "type": "1",
//           "options": {
//             "name": "contact_phone_idx",
//             "sparse": true
//           }
//         },
//         {
//           "field": "Info.mail",
//           "type": "1",
//           "options": {
//             "name": "contact_email_idx",
//             "sparse": true
//           }
//         },
//         {
//           "field": "Info.coordinates.latitude",
//           "type": "1",
//           "options": {
//             "name": "geo_latitude_idx"
//           }
//         },
//         {
//           "field": "Info.coordinates.longitude",
//           "type": "1",
//           "options": {
//             "name": "geo_longitude_idx"
//           }
//         },
//         {
//           "fields": [
//             {
//               "field": "Info.coordinates.latitude",
//               "type": "1"
//             },
//             {
//               "field": "Info.coordinates.longitude",
//               "type": "1"
//             }
//           ],
//           "options": {
//             "name": "geo_2dsphere_idx",
//             "2dsphereIndexVersion": 3
//           }
//         },
//         {
//           "field": "schedules.day",
//           "type": "1",
//           "options": {
//             "name": "schedule_day_idx"
//           }
//         },
//         {
//           "field": "staff.email",
//           "type": "1",
//           "options": {
//             "name": "staff_email_idx",
//             "sparse": true
//           }
//         }
//       ]
//     }
//   }