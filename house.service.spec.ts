import { Test, TestingModule } from '@nestjs/testing';
import { HouseService } from './house.service';
import { getModelToken } from '@nestjs/mongoose';
import { House, Category } from './schemas/house.schema';
import mongoose, { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateHouseDto } from './dto/CreateHouse.dto';
import { User } from '../auth/schemas/user.schema';
import { CreateHouseDto } from './dto/CreateHouse.dto';

describe('HouseService', () => {
  let houseService: HouseService;
  let model: Model<House>;

  const mockHouse = {
    _id: '61c0ccf11d7bf83d153d7c06',
    user: '61c0ccf11d7bf83d153d7c06',
    title: 'New House',
    description: 'House Description',
    price: $400,
    category: Category.FANTASY,
  };

  const mockUser = {
    _id: '61c0ccf11d7bf83d153d7c06',
    name: 'Haile Doe',
    email: 'haile.doe@gmail.com',
  };

  const mockHouseService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseService,
        {
          provide: getModelToken(House.name),
          useValue: mockHouseService,
        },
      ],
    }).compile();

    houseService = module.get<HouseService>(HouseService);
    model = module.get<Model<House>>(getModelToken(House.name));
  });

  describe('findAll', () => {
    it('should return an array of houses', async () => {


      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockHouse]),
            }),
          } as any),
      );

      const result = await houseService.findAll();

      expect(model.find).toHaveBeenCalledWith({
        title: { $regex: 'test', $options: 'i' },
      });

      expect(result).toEqual([mockHouse]);
    });
  });

  describe('create', () => {
    it('should create and return a house', async () => {
      const newHouse = {
        title: 'New House',
        description: 'House Description',
        price: $400,
        category: Category.FANTASY,
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockHouse));

      const result = await houseService.create(
        newHouse as CreateHouseDto,
        mockUser as User,
      );

      expect(result).toEqual(mockHouse);
    });
  });

  describe('findById', () => {
    it('should find and return a house by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockHouse);

      const result = await houseService.findById(mockHouse._id);

      expect(model.findById).toHaveBeenCalledWith(mockHouse._id);
      expect(result).toEqual(mockHouse);
    });

    it('should throw BadRequestException if invalid ID is provided', async () => {
      const id = 'invalid-id';

      const isValidObjectIDMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      await expect(houseService.findById(id)).rejects.toThrow(
        BadRequestException,
      );

      expect(isValidObjectIDMock).toHaveBeenCalledWith(id);
      isValidObjectIDMock.mockRestore();
    });

    it('should throw NotFoundException if house is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      await expect(houseService.findById(mockHouse._id)).rejects.toThrow(
        NotFoundException,
      );

      expect(model.findById).toHaveBeenCalledWith(mockHouse._id);
    });
  });

  describe('updateById', () => {
    it('should update and return a house', async () => {
      const updatedHouse = { ...mockHouse, title: 'Updated name' };
      const house = { title: 'Updated name' };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedHouse);

      const result = await houseService.updateById(mockHouse._id, house as any);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockHouse._id,
        house,
        {
        new: true,
        runValidators: true,
      });

      expect(result.title).toEqual(house.title);
    });
  });

  describe('deleteById', () => {
    it('should delete and return a house', async () => {
jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockHouse);

      const result = await houseService.deleteById(mockHouse._id);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockHouse._id);

      expect(result).toEqual(mockHouse);
    });
  });
});