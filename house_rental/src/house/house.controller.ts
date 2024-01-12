import { BadRequestException, 
  Body, 
  Controller,
  Delete,
  Get, 
  Param, 
  Post, 
  Put, 
  Res, 
  UploadedFile, 
  Query, 
  UseGuards, 
  Req} from '@nestjs/common';
import { HouseService } from './house.service';
import { House } from './schemas/house.schema';
import { CreateHouseDto } from './dto/CreateHouse.dto';
import { updateHouseDto } from './dto/updateHouse.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Role } from 'src/auth/users/role.enum';

@Controller('house')
export class HouseController {
  constructor(private readonly HouseService: HouseService) {}







  @Get()
  async getAllHouses(@query() query: ExpressQuery): Promise<House[]> {
    return this.HouseService.findAll(query);
  }



  @Get(':id')
  findById(@Param('id') id: string): Promise<House> {
    return this.HouseService.findById(id);
  }


  @Put(':id')
  
  update(
    @Body() house: updateHouseDto,
    @Param('id')
    id: string,
  ): Promise<House> {
    return this.HouseService.updateBy(id, house);
  }



  @Post()
  
  @UseGuards(AuthGuard() )
  async createHouse(
    @Body()
    house: CreateHouseDto,
    @Req() req,
  ): Promise<House> {
    
    return this.HouseService.create(house, req.user);
  }
  House(): House | PromiseLike<House> {
    throw new Error('Method not implemented.');
   }

  uploadData(
    @Body() HouseDTO: HouseDTO,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    console.log(file)
    if (!file){
      throw new BadRequestException('File is not appropriate');
    } else {
      const picturePathURL = `http://localhost:3000/Houses/viewImage/${file.filename}`;
      this.HouseService.create(HouseDTO, picturePathURL);
    }
}
  @Get('viewImage/:filename')
  async viewTheFile(
    @Param('filename') filename,
    @Res() res: Response,
  ): Promise<void> {
    return await res.sendFile(filename, { root: './uploads' });
} 

  @Delete(':id')
  
  delete(@Param('id') id): Promise<House> {
    return this.HouseService.delete(id);
}



}
function query(): (target: HouseController, propertyKey: "getAllHouses", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

