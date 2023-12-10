import { Bucket } from 'sst/node/bucket'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'

const s3Client = new S3Client({})

export async function imageIsInStore(key: string): Promise<boolean> {
  try {
    const command = new GetObjectCommand({
      Key: key,
      Bucket: Bucket.ArkhamHqCollectingBucket.bucketName,
    })

    const response = await s3Client.send(command)
    return response.Body !== undefined
  } catch (error) {
    return false
  }
}

export async function storeImage(key: string, imageBuffer: Buffer) {
  console.log('trying to upload image', key)

  try {
    const command = new PutObjectCommand({
      ACL: 'public-read',
      Key: key,
      Bucket: Bucket.ArkhamHqCollectingBucket.bucketName,
      Body: imageBuffer,
    })

    const response = await s3Client.send(command)
    console.log('upload response', key, response)
  } catch (error) {
    console.error('upload failed for image', key, 'with error:', error)
  }
}
