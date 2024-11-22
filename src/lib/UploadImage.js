
export const uploadImage = async (image) => {
    
    const fileExtension = image.name.split('.').pop();
    const imageName = `${Date.now()}.${fileExtension}`;
    const { data, error } = await supabase.storage
    .from('soko-yetu')
    .upload(`products/${imageName}`, image, {
      cacheControl: '3600',
      upsert: false,
      contentType: image.type, 
    });
  return { data, error }
}
