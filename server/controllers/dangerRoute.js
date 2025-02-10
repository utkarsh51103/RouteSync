import { MongoClient } from "mongodb";

const atlasString = "mongodb+srv://utkarshsharmabd:z3kD9MmkkTJGmF2c@cluster0.7t44k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const compassString = "mongodb://localhost:27017"

const dangerlocation = async(req,res)=>{
    const client = new MongoClient(compassString)
    try{

        const {routeCords} = req.body;

        if(routeCords.length === 0){
            res.status(400).json({message:"No route provided"});
            return;
        }

        await client.connect().then(console.log("MongoDB Connected Successfully"));
        const datab = client.db('RouteSync').collection('DangerLocations');

        const dangerplaces = [];

        for(const cords of routeCords){
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
            dangerplaces.push(...nearby);
        }


        res.status(200).json({data : dangerplaces});

      }catch(e){
        console.log(e);
      }
}

export {dangerlocation}