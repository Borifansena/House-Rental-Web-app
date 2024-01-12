import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { House } from './schemas/house.schema';
import { updateHouseDto } from './dto/updateHouse.dto';
import { Query } from 'mongoose';


import { Query } from 'express-serve-static-core';
import { user } from 'src/auth/schemas/user.schema';




  @Injectable()
export class HouseService {
  findById(_id: string) {
      throw new Error('Method not implemented.');
  }
  async updateBy(_id: string, _house: updateHouseDto): Promise<House> {
    throw new Error('Method not implemented.');
    }


  constructor(
    @InjectModel(House.name)
    private houseModule: mongoose.Model<House>,
  ) {}

  async findAll(query: Query): Promise<House[]> {
    const { keyword } = query;
    const searchQuery = keyword
      ? {
          title: {
            $regex: keyword,
            $options: 'i',
        },
      } : {};

    return await this.houseModule.find(searchQuery);
    }

  async findOne(id: string): Promise<House> {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Invalid ID');
      }

    return await this.houseModule.findById(id);
    }

  async create(
    houseDTO: HouseDTO,
    user: user,
    picturePathURL: string,
  ): Promise<House> {
    const houseData = new this.houseModule(houseDTO);
    houseData.user = user.id;
    houseData.picturePath = picturePathURL;
      
    return await this.houseModule.create(houseData);
    }

  async delete(id: any): Promise<House> {
    throw new Error('Method not implemented.');
    }

  async update(id: string, house: House): Promise<House> {
    return await this.houseModule.findByIdAndUpdate(id, house, {
      new: true,
      runValidators: true,
      });
    }

  
  }
