
import Airtable from 'airtable';


const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_API_KEY }).base('app744Lf8ON85OjM9');



export const getPublishedProjects = async () => {
  try {
    const records = await base('Projets')
      .select({
        sort: [{ field: "Date de publication", direction: "desc" }] 
      })
      .all();


    return records.map(record => {
      console.log('EmailAdmin:', record.fields['EmailAdmin']); 
      console.log('MDP_ADMIN:', record.fields['MDP_ADMIN']); 

      return {
        id: record.id,
        ...record.fields, 
        EmailAdmin: record.fields['EmailAdmin'] || 'Email non disponible', 
      };
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
    throw error;
  }
};



export const incrementLike = async (projectId, currentLikes = 0) => {
  try {
    const updatedRecord = await base('Projets').update(projectId, {
      Likes: currentLikes + 1,
    });
    return updatedRecord.fields.Likes;
  } catch (error) {
    console.error('Erreur lors de l\'incrémentation du like :', error);
    throw error;
  }
};

export const updateProjectPublication = async (projectId, publicationStatus) => {
  if (!projectId || publicationStatus === undefined) {
    console.error('Erreur : L\'ID du projet ou la valeur de publication est manquante');
    return;
  }

  try {
    const updatedRecord = await base('Projets').update([
      {
        id: projectId,
        fields: {
          Publication: publicationStatus, 
        },
      },
    ]);

    console.log('Projet mis à jour avec succès :', updatedRecord);
    return updatedRecord;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la publication :', error);
    throw error;
  }
};