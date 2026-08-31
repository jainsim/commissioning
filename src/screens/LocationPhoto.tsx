import { useRef } from 'react'
import { Camera } from 'lucide-react'
import { TopBar, Button } from '../components/Chrome'
import { CapturePhotoArt } from '../components/Illustration'
import { back } from '../lib/router'

export function LocationPhoto({
  photo,
  setPhoto,
  comment,
  setComment,
}: {
  photo: string | null
  setPhoto: (v: string | null) => void
  comment: string
  setComment: (v: string) => void
}) {
  const input = useRef<HTMLInputElement>(null)

  /*
    capture="environment" on a file input asks a phone to open the rear camera
    directly instead of the photo library. It is a plain HTML attribute, no
    camera API and no permissions dance, and it degrades to a normal file
    picker on desktop. URL.createObjectURL gives us a local preview without
    uploading anything.
  */
  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  return (
    <>
      <TopBar title="Express Solo …1234" />
      <div className="body">
        <h3 className="title">Location photo</h3>
        <p className="lede">Help drivers locate the station. Capture the station and its surroundings.</p>

        <div className="photoslot">
          {photo ? <img src={photo} alt="Captured station location" /> : <CapturePhotoArt />}
        </div>

        <input
          ref={input}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onFile}
          style={{ display: 'none' }}
        />
        <Button variant="secondary" onClick={() => input.current?.click()}>
          <Camera size={22} /> {photo ? 'Retake photo' : 'Add photo'}
        </Button>

        <div className="field" style={{ marginTop: 22 }}>
          <label htmlFor="cmt">Optional details</label>
          <textarea
            id="cmt"
            placeholder="Other helpful comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>

      <div className="footer">
        <Button onClick={back} disabled={!photo}>Done</Button>
      </div>
    </>
  )
}
