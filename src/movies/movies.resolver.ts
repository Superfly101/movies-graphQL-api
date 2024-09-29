import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { MovieModel } from './movie.model';
import { CreateMovieInput } from './dto/create-movie.dto';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => [MovieModel])
  async movies() {
    return this.moviesService.findAll();
  }

  @Query(() => MovieModel)
  async movieById(@Args('id', { type: () => Int }) id: number) {
    return this.moviesService.findOne(id);
  }

  @Mutation(() => MovieModel)
  async createMovie(
    @Args('createMovieInput') createMovieInput: CreateMovieInput,
  ) {
    return this.moviesService.create(createMovieInput);
  }

  //   @Mutation(() => MovieModel)
  //   async removeMovie(@Args('id', { type: () => Int }) id: number) {
  //     return this.moviesService.remove(id);
  //   }
}
