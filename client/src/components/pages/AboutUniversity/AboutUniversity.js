import React from "react";
import Header from "../../common/Header/Header";
import {
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
} from "@material-ui/core";
import "./AboutUniversity.css";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

export const AboutUniversity = () => {
	return (
		<div className="home">
			<Header />
			<div className="container" id="aboutContainer">
				<Grid container justify="center">
					<Grid item xs={10}>
						<Card variant="outlined">
							<Grid
								container
								justify="center"
								alignItems="flex-start"
								className="p-3 ">
								<Grid item xs={8} md={4}>
									<Grid
										container
										justify="center"
										alignContent="center">
										<CardMedia
											component="img"
											style={{ maxWidth: "150px" }}
											image=""
											label={"Logo"}
										/>
									</Grid>
								</Grid>
								<Grid item xs={12} md={12}>
									<Grid container justify="center">
										<CardContent className="text-center">
											<Typography
												gutterBottom
												variant="h3"
												component="h2">
												{""}
											</Typography>
											<Typography
												gutterBottom
												variant="subtitle1">
												<a
													href="https://www.stamforduniversity.edu.bd/"
													target="_blank"
													rel="noreferrer noopener">
													{
														"Official University Website"
													}
													<OpenInNewIcon fontSize="small" />
												</a>
											</Typography>
										</CardContent>
									</Grid>
								</Grid>
							</Grid>
						</Card>
					</Grid>
				</Grid>
				<Grid container justify="center" className="my-3">
					<Grid item xs={10}>
						<Card variant="outlined">
							<Container className="px-5 py-4">
								<Typography
									variant="h4"
									className="text-center pb-3">
									About University
								</Typography>
								<Typography variant="body2">
									{
										
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										"The mission of Stamford University, Bangladesh is to provide and facilitate global standard of education to its students of all walks of life irrespective of gender, religion, cast, creed, color, age, time and place, with a view to preparing them for leadership and service in multicultural, global and technological societies by helping the students in succeeding academically and in the transition from university life to productive life."
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										"Stamford University, Bangladesh is moving forward with a vision of Excellence - 'Moving Educational Excellence from Good to Great'. Form good to better to excellent and from excellent to great. With a long range Strategic Planning the University continues the transformative process of being, one of the premier universities of higher education in this region and it is evident by the milestones that have been set by Stamford Group in Bangladesh over te last 10 years. The current plan articulates new directions for the university."
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										
									}
								</Typography>
								<br />
								<Typography variant="body2">
									{
										
									}
								</Typography>
							</Container>
						</Card>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
