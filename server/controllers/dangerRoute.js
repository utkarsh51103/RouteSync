import { MongoClient } from "mongodb";

const atlasString = "mongodb+srv://utkarshsharmabd:z3kD9MmkkTJGmF2c@cluster0.7t44k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const compassString = "mongodb://localhost:27017"

const dangerlocation = async(req,res)=>{
    const client = new MongoClient(atlasString)
    try{

        const {routeCords} = req.body;

        if(routeCords.length === 0){
            res.status(400).json({message:"No route provided"});
            return;
        }

        await client.connect().then(console.log("MongoDB Connected Successfully"));
        const datab = client.db('test').collection('dangerpoints');

        const dangerplaces = [];

        for(const cords of routeCords){
            console.log("📍 Searching for Nearby Dangers at:", cords);
            const nearby = await datab.find({
                location:{
                    $near:{
                        $geometry:{
                            type: 'Point',
                            coordinates: [cords.lng,cords.lat]
                        },
                        $maxDistance: 200
                    }
                }
            },{
                projection:{
                    Latitude: 1,
                    Longitude: 1,
                    'FrequentCrime':1,
                    'LocationName':1,
                    _id: 1
                }
            }).toArray();
            console.log("🔎 Nearby Places Found:", nearby.length);
            dangerplaces.push(...nearby);
        }

        console.log("📦 Final Danger Locations Array:", dangerplaces);
        res.status(200).json({data : dangerplaces});

      }catch(e){
        console.log(e);
      }
}

export {dangerlocation}