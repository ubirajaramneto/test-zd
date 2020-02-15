import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pos {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  tradingName: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  ownerName: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true, nullable: false })
  document: string;

  @ApiProperty({
    type: 'object',
    example: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [-43.319435119628906, -23.00090579268712],
            [-43.29317092895508, -23.00090579268712],
            [-43.29317092895508, -22.977359643321556],
            [-43.319435119628906, -22.977359643321556],
            [-43.319435119628906, -23.00090579268712],
          ],
        ],
      ],
    },
  })
  @Column({ type: 'geometry', spatialFeatureType: 'MultiPolygon', srid: 4326 })
  @Index({ spatial: true })
  coverageArea;

  @ApiProperty({
    type: 'object',
    example: {
      type: 'Point',
      coordinates: [-43.303062915802, -22.993478927085018],
    },
  })
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  @Index({ spatial: true })
  address;
}
