import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieInput } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOneBy({ id });
  }

  async create(createMovieInput: CreateMovieInput): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieInput);
    return this.moviesRepository.save(movie);
  }

  async remove(id: number) {
    const movie = await this.moviesRepository.findOneBy({ id });
    await this.moviesRepository.delete(id);
    return movie;
  }
}
