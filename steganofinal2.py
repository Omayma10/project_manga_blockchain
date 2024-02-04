from PIL import Image
import boto3
from io import BytesIO

s3 = boto3.client('s3',
	endpoint_url='https://s3.filebase.com',
	aws_access_key_id="F1489A956828931279A7",
	aws_secret_access_key="liTc8P7FqU3ZPC9taARCRlGdfneKcqA3VIJSDUzL")


def fichier_stegano (name_img, nb_exemplaires):
    for k in range(nb_exemplaires):
        msg = "exemplairenumero"+ str(k)
        im = Image.open(name_img)
        # on récupère les dimensions de l'image
        w , h = im.size

        # on sépare l'image en trois : rouge, vert et bleu
        r , g , b = im.split()

        # on transforme la partie rouge en liste
        r = list( r.getdata() )

        # on calcule la longueur de la chaîne et on la transforme en binaire
        u = len(msg)
        v = bin( len(msg) )[2:].rjust(8,"0")

        # on transforme la chaîne en une liste de 0 et de 1 
        ascii = [ bin(ord(x))[2:].rjust(8,"0") for x in msg ]

        # transformation de la liste en chaîne
        a = ''.join(ascii)

        # on code la longueur de la liste dans les 8 premiers pixels rouges
        for j in range(8):
            r[j] = 2 * int( r[j] // 2 ) + int( v[j] )

        # on code la chaîne dans les pixels suivants
        for i in range(8*u):
            r[i+8] = 2 * int( r[i+8] // 2 ) + int( a[i] )
            
        # on recrée l'image rouge 
        nr = Image.new("L",(16*w,16*h))
        nr = Image.new("L",(w,h))
        nr.putdata(r)

        # fusion des trois nouvelles images
        imgnew = Image.merge('RGB',(nr,g,b))

        img_byte_arr = BytesIO()
        imgnew.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)

        bucket_name = "projetbc"
        key_name = f'{name_img.rsplit(".", 1)[0]}{k}.png'
        s3.put_object(Body=img_byte_arr, Bucket=bucket_name, Key=key_name)
    
    print("c'est bon")


fichier_stegano("hunterexemplaire.png", 3)
