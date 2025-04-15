// pages/api/indexmongo.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Collection, Db, IndexSpecification, CreateIndexesOptions } from 'mongodb';
import clientPromise from '../../../lib/mongoose';

// Tipos para la solicitud
type IndexDefinition = {
  field: string;
  type: 'text' | 1 | -1;
  unique?: boolean;
  options?: CreateIndexesOptions;
};

type CollectionIndexes = {
  [collectionName: string]: IndexDefinition[];
};

// Tipos para la respuesta
type IndexResult = {
  field: string;
  indexName?: string;
  status: 'success' | 'error';
  error?: string;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  results: {
    [collectionName: string]: IndexResult[];
  };
  error?: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      results: {},
      error: 'Método no permitido' 
    });
  }

  try {

    const dbName = process.env.NODE_ENV === "development" ? "menuDevDB" : "menuDB";
    const client = await clientPromise;
    const db: Db = client.db(dbName);


    // const client = await clientPromise;
    // const db: Db = client.db("menuDB");
    const indexDefinitions = req.body as CollectionIndexes;

    const results: { [collectionName: string]: IndexResult[] } = {};

    // Procesar cada colección
    for (const [collectionName, indexes] of Object.entries(indexDefinitions)) {
      if (!Array.isArray(indexes)) {
        continue;
      }

      results[collectionName] = [];
      const collection: Collection = db.collection(collectionName);

      // Crear cada índice definido
      for (const indexDef of indexes) {
        try {
          const options: CreateIndexesOptions = {
            name: `${collectionName}_${indexDef.field}_idx`,
            unique: indexDef.unique || false,
            ...(indexDef.options || {})
          };

          const indexSpec: IndexSpecification = {
            [indexDef.field]: indexDef.type === "text" ? "text" : indexDef.type
          };

          const indexName = await collection.createIndex(indexSpec, options);
          results[collectionName].push({
            field: indexDef.field,
            indexName,
            status: "success"
          });
        } catch (error: unknown) {
          results[collectionName].push({
            field: indexDef.field,
            status: "error",
            error: error instanceof Error ? error.message : 'Error desconocido'
          });
        }
      }
    }

    return res.status(200).json({ 
      success: true,
      results,
      message: 'Índices creados/actualizados'
    });

  } catch (error: unknown) {
    console.error('Error en indexmongo:', error);
    return res.status(500).json({ 
      success: false,
      results: {},
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}